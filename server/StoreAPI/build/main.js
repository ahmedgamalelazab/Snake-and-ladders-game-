"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var src_1 = require("./src");
var app = new src_1.ExpressApp();
setImmediate(function () {
    app.start();
});
