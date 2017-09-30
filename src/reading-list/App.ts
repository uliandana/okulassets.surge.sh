import { CATEGORIES } from "./util/EnvConfig";
import DataGenerator from "./command/DataGenerator";
import LatestIssuesGenerator from "./command/LatestIssuesGenerator";
import ImagesRenamer from "./command/ImagesRenamer";

export class App {
    static generate() {
        CATEGORIES.forEach((item: string) => {
            App.generateData(item);
            App.renameImages(item);
        });
    }

    static async generateLatest() {
        let latestIssuesGenerator: LatestIssuesGenerator = new LatestIssuesGenerator();
        await latestIssuesGenerator.generate();
        console.log("Latest issues generated");
    }

    static generateData(category: string) {
        let dataGenerator: DataGenerator = new DataGenerator(category);
        dataGenerator.generate().then(() => {
            console.info(`${category} data generated`);
        });
    }

    static renameImages(category: string) {
        let imagesRenamer: ImagesRenamer = new ImagesRenamer(category);
        imagesRenamer.rename().then(() => {
            console.info(`${category} images renamed`);
        });
    }
}