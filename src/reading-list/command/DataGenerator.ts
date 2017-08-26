import { DATA_SOURCE, RESULT_DEST } from "../util/EnvConfig";
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
    private titleRef: string[];
    private series: Series[];
    private weeks: Week[];
    private infoSeries: Info[];
    private infoWeek: string[];
    private oneshots: Series;

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
        fs.recurseSync(dataSrc, ["*.txt"], (filepath, relative, filename) => {
            this.infoWeek.push(filename.replace(/\.txt$/, ""));
            readTxts.push(this.readTxt(filepath, filename));
        });
        
        let txtDatas: TxtData[] = await Promise.all(readTxts);
        
        this.titleRef.forEach((item) => {
            this.series.push(new Series(item));
        });

        txtDatas.forEach((item) => {
            this.parseIssues(item);
        });

        del(`${RESULT_DEST}/${this.categoryEncoded}/data/**/*.json`)
        .then(() => {
            this.series.forEach((item) => {
                item.startDate = item.issues[0].date;
                item.totalIssues = item.issues.length;
                this.infoSeries.push(new Info(item));
                this.saveJson(`${RESULT_DEST}/${this.categoryEncoded}/data/series/${Util.textEncode(item.title)}.json`, item);
            });
    
            this.weeks.forEach((item) => {
                this.saveJson(`${RESULT_DEST}/${this.categoryEncoded}/data/week/${item.date}.json`, item);
            });

            this.saveJson(`${RESULT_DEST}/${this.categoryEncoded}/data/info.json`, { series: this.infoSeries, week: this.infoWeek });
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

        if (this.titleRef.findIndex((ref) => { return ref == text}) != -1) retval = text;
        return retval;
    }

    private addIssueToSeries(issue: Issue) {
        let findIdx = this.series.findIndex((item) => { return item.title == issue.title});
        if (findIdx == -1) {
            if (!this.oneshots) this.oneshots = new Series("Oneshots");
            this.oneshots.issues.push(issue);
        }
        this.series[findIdx].issues.push(issue);
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

export class Info {
    title: string;
    titleEncoded: string;
    status: string;
    startDate: string;
    endDate: string;
    totalIssues: number;

    constructor(series: Series) {
        this.title = series.title;
        this.titleEncoded = Util.textEncode(series.title);
        this.status = series.status;
        this.startDate = series.startDate;
        this.endDate = series.endDate;
        this.totalIssues = series.totalIssues;
    }
}