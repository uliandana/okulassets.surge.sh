import { CATEGORIES, RESULT_DEST } from "../util/EnvConfig";
import Issue from "../entity/Issue";
import Util from "../util/Util";

const jsonfile = require("jsonfile");
const fs = require("file-system");
const lr = require("line-reader");
const del = require("del");

export default class LatestIssuesGenerator {
    private issues: Issue[];
    
    constructor() {
        this.issues = [];
    }

    async generate() {
        CATEGORIES.forEach(category => {
            let categoryEncoded = Util.textEncode(category);
            let weekSrc = `${RESULT_DEST}/${categoryEncoded}/data/week`;
            let latestJson: string;
            fs.recurseSync(weekSrc, ["*.json"], (filepath, relative, filename) => {
                latestJson = filename;
            });

            let issuesFromCategory: Issue[] = jsonfile.readFileSync(`${weekSrc}/${latestJson}`).issues;
            issuesFromCategory.forEach(issue => { this.issues.push(issue); });
        });

        let dest = `${RESULT_DEST}/latest-issues.json`;
        del(dest)
        .then(() => { jsonfile.writeFileSync(dest, { data: this.issues }, {spaces: 4}); });
    }
}