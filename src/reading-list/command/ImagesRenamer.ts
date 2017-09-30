import { RESULT_DEST } from "../util/EnvConfig";
import Util from "../util/Util";

const r = require("rename");
const fs = require("file-system");

export default class ImagesRenamer {
    private category: string;
    private categoryEncoded: string;

    constructor(category: string) {
        this.category = category;
        this.categoryEncoded = Util.textEncode(category);
    }

    async rename() {
        let imagesSrc = `${RESULT_DEST}/${this.categoryEncoded}/image/lg/`;
        fs.recurseSync(imagesSrc, (filepath, relative, filename) => {
            let imageName = filename.replace(/\.jpe?g/, "");
            require('fs').rename(filepath, filepath.replace(imageName, Util.textEncode(imageName)));
        });
    }
}