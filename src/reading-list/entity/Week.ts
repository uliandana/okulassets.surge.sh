import Issue from "./Issue";

export default class Week {
    date: string;
    totalIssues: number;
    issues: Issue[];

    constructor(date: string) {
        this.date = date;
        this.totalIssues = 0;
        this.issues = [];
    }
}