import Issue from "./Issue";

export default class Series {
    title: string;
    status: string;
    startDate: string;
    endDate: string;
    totalIssues: number;
    issues: Issue[];

    constructor(title: string) {
        this.title = title;
        this.status = "";
        this.startDate = "";
        this.endDate = "";
        this.totalIssues = 0;
        this.issues = [];
    }
}