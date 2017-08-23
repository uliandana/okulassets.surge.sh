import EnvConfig from "../config/EnvConfig";
import { Issue } from "./Issue";

export class Title {
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    totalIssues: number;
    issues: Issue[];

    constructor() {
        this.name = "";
        this.status = "";
        this.startDate = "";
        this.endDate = "";
        this.totalIssues = 0;
        this.issues = [];
    }
}