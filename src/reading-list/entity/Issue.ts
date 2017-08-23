import EnvConfig from "../config/EnvConfig";

export class Issue {
    name: string;
    title: string;
    date: string;
    images: Images;

    constructor(name:string) {
        this.name = name;
        this.title = "";
        this.date = "";
        this.images = new Images();
    }
}

export class Images {
    lg: string;
    md: string;
    sm: string;
    xs: string;

    constructor() {
        this.lg = "";
        this.md = "";
        this.sm = "";
        this.xs = "";
    }
}