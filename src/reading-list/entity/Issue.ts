import Util from "../util/Util";

export default class Issue {
    name: string;
    title: string;
    date: string;
    images: Images;

    constructor(name:string, category: string) {
        this.name = name;
        this.title = "";
        this.date = "";
        this.images = new Images(name, category);
    }
}

export class Images {
    lg: string;
    md: string;
    sm: string;
    xs: string;

    constructor(name: string, category: string) {
        this.lg = `${category}/image/lg/${Util.textEncode(name)}.jpg`;
        this.md = `${category}/image/md/${Util.textEncode(name)}.jpg`;
        this.sm = `${category}/image/sm/${Util.textEncode(name)}.jpg`;
        this.xs = `${category}/image/xs/${Util.textEncode(name)}.jpg`;
    }
}