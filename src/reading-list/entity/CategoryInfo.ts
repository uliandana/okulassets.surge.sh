import Series from "./Series"
import Util from "../util/Util"

export class CategoryInfo {
    series: InfoSeries[];
    week: InfoWeek[];

    constructor(series: InfoSeries[], week: InfoWeek[]) {
        this.series = series;
        this.week = week;
    }
}
export class InfoSeries {
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

export class InfoWeek {
    year: number;
    month: number;
    date: number;

    constructor(date: string) {
        this.year = parseInt(date.split("-")[0]);
        this.month = parseInt(date.split("-")[1]);
        this.date = parseInt(date.split("-")[2]);
    }
}