require("dotenv").config();
const app = require("./App").App;
const param = process.argv[2];

switch(param) {
    case "generate": app.generate(); break;
    case "latest-issues": app.generateLatest(); break;
    default: console.warn("Parameter is unknown");
}