import Util from "../util/Util";

export default class Issue {
    name: string;
    nameEncoded: string;
    category: string;
    categoryEncoded: string;
    title: string;
    titleEncoded: string;
    date: string;
    images: Images;

    constructor(name:string, category: string) {
        this.name = name;
        this.nameEncoded = Util.textEncode(name);
        this.category = category;
        this.categoryEncoded = Util.textEncode(category);
        this.title = "";
        this.titleEncoded = "";
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
        this.lg = `${Util.textEncode(category)}/image/lg/${Util.textEncode(name)}.jpg`;
        this.md = `${Util.textEncode(category)}/image/md/${Util.textEncode(name)}.jpg`;
        this.sm = `${Util.textEncode(category)}/image/sm/${Util.textEncode(name)}.jpg`;
        this.xs = `${Util.textEncode(category)}/image/xs/${Util.textEncode(name)}.jpg`;
    }
}