import { DATA_SOURCE, RESULT_DEST, ISSUE_PER_PAGE } from "../util/EnvConfig";
import { CategoryInfo, InfoSeries, InfoWeek } from "../entity/CategoryInfo"
import Issue from "../entity/Issue";
import Series from "../entity/Series";
import Week from "../entity/Week";
import Util from "../util/Util";

const jsonfile = require("jsonfile");
const fs = require("file-system");
const lr = require("line-reader");
const del = require("del");

export default class DataGenerator {
    private category: string;
    private categoryEncoded: string;
    private titleRef: { title: string, status: "ongoing" | "completed" | "incomplete" }[];
    private series: Series[];
    private weeks: Week[];
    private infoSeries: InfoSeries[];
    private infoWeek: InfoWeek[];

    constructor(category: string) {
        this.category = category;
        this.categoryEncoded = Util.textEncode(category);
        this.titleRef = this.setReference();
        this.series = [];
        this.weeks = [];
        this.infoSeries = [];
        this.infoWeek = [];
    }

    async generate() {
        let dataSrc: string = `${DATA_SOURCE}/${this.categoryEncoded}/`;
        let readTxts: any[] = [];
        let datesFromTxt: string[] = [];

        fs.recurseSync(dataSrc, ["*.txt"], (filepath, relative, filename) => {
            datesFromTxt.push(filename.replace(/\.txt$/, ""));
            readTxts.push(this.readTxt(filepath, filename));
        });
        
        let txtDatas: TxtData[] = await Promise.all(readTxts);
        
        this.titleRef.forEach((item) => {
            this.series.push(new Series(item.title, item.status));
        });

        txtDatas.forEach((item) => {
            this.parseIssues(item);
        });

        this.infoWeek = InfoWeek.buildFromDatesArray(datesFromTxt);

        del(`${RESULT_DEST}/${this.categoryEncoded}/data/**/*.json`)
        .then(() => {
            this.generateSeriesJson();
            this.generateWeeksJson();
            this.generateInfoJson();
        });
    }

    private setReference() {
        return jsonfile.readFileSync(`${__dirname}/../reference/${this.categoryEncoded}-title.json`).data;
    }

    private readTxt(filepath: string, filename: string) {
        return new Promise((resolve, reject) => {
            let txtdata = new TxtData(filename.replace(/\.txt$/, ""));
            lr.eachLine(filepath, (line: string, last: boolean, cb) => {
                txtdata.lines.push(line.replace(/^v /, ""));
                if (last) resolve(txtdata);
                else cb();
            });
        });
    }

    private parseIssues(txtData: TxtData) {
        let newWeek: Week = new Week(txtData.date);
        txtData.lines.forEach((line) => {
            let issue: Issue = new Issue(line, this.categoryEncoded);
            issue.title = this.titleFromReference(line);
            issue.date = txtData.date;
            newWeek.issues.push(issue);
            this.addIssueToSeries(issue);
        });
        newWeek.totalIssues = newWeek.issues.length;
        this.weeks.push(newWeek);
    }

    private titleFromReference(text: string) {
        let retval = "Oneshots";
        if (text.match(/ [0-9\/\s(of)]*$/)) text = text.replace(/ [0-9\/\s(of)]*$/g, '');
        if (text.match(/ Annual$/)) text = text.replace(/ Annual$/g, '');
        if (text.match(' - ')) text = text.split(' - ')[0];
        if (text.match(/ Special$/)) text = text.replace(/ Special$/g, '');

        if (this.titleRef.findIndex((ref) => { return ref.title == text}) != -1) retval = text;
        return retval;
    }

    private addIssueToSeries(issue: Issue) {
        let findIdx = this.series.findIndex((item) => { return item.title == issue.title});
        this.series[findIdx].issues.push(issue);
    }

    private generateSeriesJson() {
        this.series.forEach((item) => {
            item.startDate = item.issues[0].date;
            item.endDate = item.status == "completed" ? item.issues[item.issues.length - 1].date : "";
            item.totalIssues = item.issues.length;
            item.totalPages = Math.ceil(item.totalIssues / ISSUE_PER_PAGE);
            for (let idx = 1; idx <= item.totalPages; idx++) {
                let idxSliceStart = ISSUE_PER_PAGE * (idx - 1);
                let idxSliceEnd = ISSUE_PER_PAGE * idx;
                this.saveJson(`${RESULT_DEST}/${this.categoryEncoded}/data/series/${Util.textEncode(item.title)}-${idx}.json`, Series.clone(item, idx, item.issues.slice(idxSliceStart, idxSliceEnd)));
            }
            this.infoSeries.push(new InfoSeries(item));
        });
    }

    private generateWeeksJson() {
        this.weeks.forEach((item) => {
            this.saveJson(`${RESULT_DEST}/${this.categoryEncoded}/data/week/${item.date}.json`, item);
        });
    }

    private generateInfoJson() {
        this.saveJson(`${RESULT_DEST}/${this.categoryEncoded}/data/info.json`, new CategoryInfo(this.category, this.infoSeries, this.infoWeek));
    }

    private saveJson(dest: string, obj: any) {
        jsonfile.writeFileSync(dest, obj, {spaces: 4})
    }
}

export class TxtData {
    date: string;
    lines: string[];

    constructor(date: string) {
        this.date = date;
        this.lines = [];
    }
}