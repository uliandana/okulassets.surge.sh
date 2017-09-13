import Series from "./Series"
import Util from "../util/Util"

export class CategoryInfo {
    category: string;
    series: InfoSeries[];
    week: InfoWeek[];

    constructor(category: string, series: InfoSeries[], week: InfoWeek[]) {
        this.category = category;
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
    year: string;
    months: { month: string; dates: string[] }[];

    constructor(year: string) {
        this.year = year;
        this.months = [];
    }

    static buildFromDatesArray(dateArray: string[]): InfoWeek[] {
        let retval: InfoWeek[] = [];
        let infoWeek: InfoWeek;
        let monthObj: { month: string; dates: string[] };
        let year: string = "";
        let prevYear: string = "";
        let month: string = "";
        let prevMonth: string = "";
        let date: string = "";

        dateArray.forEach((item: string, idx: number) => {
            year = item.split("-")[0];
            month = item.split("-")[1];
            date = item.split("-")[2];

            if (month !== prevMonth) {
                if (idx !== 0) infoWeek.months.push(monthObj);
                monthObj = { month: month, dates: [] }
            }
            
            if (year !== prevYear) {
                if (idx !== 0) retval.push(infoWeek);
                infoWeek = new InfoWeek(year);
            }

            monthObj.dates.push(date);

            prevMonth = month;
            prevYear = year;
        });

        infoWeek.months.push(monthObj);
        retval.push(infoWeek);
        return retval;
    }
}