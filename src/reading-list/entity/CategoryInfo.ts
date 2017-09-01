import Series from "./Series"
import Util from "../util/Util"

export default class CategoryInfo {
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