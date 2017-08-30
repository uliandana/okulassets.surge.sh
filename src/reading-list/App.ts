import { CATEGORIES } from "./util/EnvConfig";
import DataGenerator from "./command/DataGenerator";

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