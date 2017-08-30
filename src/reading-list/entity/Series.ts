import Issue from "./Issue";

export default class Series {
    title: string;
    status: string;
    startDate: string;
    endDate: string;
    totalIssues: number;
    page: number;
    totalPages: number;
    issuesThisPage: number;
    issues: Issue[];

    constructor(title: string) {
        this.title = title;
        this.status = "";
        this.startDate = "";
        this.endDate = "";
        this.totalIssues = 0;
        this.page = 1;
        this.totalPages = 1;
        this.issuesThisPage = 0;
        this.issues = [];
    }

    static clone(series: Series, page: number, issues: Issue[]) {
        let retval = new Series(series.title);
        retval.status = series.status;
        retval.startDate = series.startDate;
        retval.endDate = series.endDate;
        retval.totalIssues = series.totalIssues;
        retval.page = page;
        retval.totalPages = series.totalPages;
        retval.issuesThisPage = issues.length;
        retval.issues = issues;
        return retval;
    }
}