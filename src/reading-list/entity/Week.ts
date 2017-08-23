import EnvConfig from "../config/EnvConfig";
import { Issue } from "./Issue";

export class Week {
    date: string;
    totalIssues: number;
    issues: Issue[];

    constructor() {
        this.date = "";
        this.totalIssues = 0;
        this.issues = [];
    }
}