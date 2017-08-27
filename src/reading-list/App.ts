import { CATEGORIES } from "./util/EnvConfig";
import DataGenerator from "./command/DataGenerator";
import ImageGenerator from "./command/ImageGenerator";

export class App {
    static generate() {
        CATEGORIES.forEach((item: string) => {
            App.generateData(item);
        });
    }

    static generateData(category: string) {
        let dataGenerator: DataGenerator = new DataGenerator(category);
        dataGenerator.generate().then(() => {
            console.info(`${category} data generated`);
        });
    }
}