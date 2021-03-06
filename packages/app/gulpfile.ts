import * as gulp from "gulp";
const env = process.env.ENV;

let GulpFile:any;
let Config:any;

switch (env) {
	case "DEV":
		GulpFile = require("./scripts/dev/dev.gulpfile").DevGulpFile;
		Config = require("./config/dev/dev.config").DevConfig;
		break;
	case "PROD":
		GulpFile = require("./scripts/prod/prod.gulpfile").ProdGulpFile;
		Config = require("./config/prod/prod.config").ProdConfig;
		break;
}
new GulpFile(new Config());


