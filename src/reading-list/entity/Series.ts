import Issue from "./Issue";
import Util from "../util/Util";

export default class Series {
    title: string;
    titleEncoded: string;
    status: "ongoing" | "completed" | "incomplete";
    startDate: string;
    endDate: string;
    totalIssues: number;
    page: number;
    totalPages: number;
    issuesThisPage: number;
    issues: Issue[];
    prevTitle: string;
    prevTitleEncoded: string;
    nextTitle: string;
    nextTitleEncoded: string;

    constructor(title: string, status: "ongoing" | "completed" | "incomplete") {
        this.title = title;
        this.titleEncoded = Util.textEncode(title);
        this.status = status;
        this.startDate = "";
        this.endDate = "";
        this.totalIssues = 0;
        this.page = 1;
        this.totalPages = 1;
        this.issuesThisPage = 0;
        this.issues = [];
        this.prevTitle = "";
        this.prevTitleEncoded = "";
        this.nextTitle = "";
        this.nextTitleEncoded = "";
    }

    static clone(series: Series, page: number, issues: Issue[]) {
        let retval = new Series(series.title, series.status);
        retval.status = series.status;
        retval.startDate = series.startDate;
        retval.endDate = series.endDate;
        retval.totalIssues = series.totalIssues;
        retval.page = page;
        retval.totalPages = series.totalPages;
        retval.issuesThisPage = issues.length;
        retval.issues = issues;
        retval.prevTitle = series.prevTitle;
        retval.prevTitleEncoded = series.prevTitleEncoded;
        retval.nextTitle = series.nextTitle;
        retval.nextTitleEncoded = series.nextTitleEncoded;
        return retval;
    }
}