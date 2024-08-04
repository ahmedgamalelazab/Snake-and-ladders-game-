"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressApp = void 0;
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var execOnlyDevEnv_util_1 = require("./utils/execOnlyDevEnv.util");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ExpressApp = /** @class */ (function () {
    function ExpressApp() {
        this._express = (0, express_1.default)();
        this.bootStrapMiddlewares.bind(this)();
        this.bootStrapControllers.bind(this)();
        this.bootStrapErrorHandlers.bind(this)();
        this.bootstrapRunTimeExeptions.bind(this)();
    }
    ExpressApp.prototype.bootStrapControllers = function () {
        var _this = this;
        var controllersPath = path_1.default.join(__dirname, 'controllers');
        fs_1.default.readdirSync(controllersPath).forEach(function (file) {
            var controller = require(path_1.default.join(controllersPath, file)).default;
            var controllerPath = file.split('.')[0];
            _this._express.use("/api/".concat(controllerPath), controller(express_1.default.Router()));
        });
    };
    ExpressApp.prototype.bootStrapMiddlewares = function () {
        var _this = this;
        this._express.use((0, helmet_1.default)());
        this._express.use((0, cors_1.default)());
        (0, execOnlyDevEnv_util_1.execOnlyDevEnv)(function () {
            _this._express.use((0, morgan_1.default)('dev'));
        });
    };
    ExpressApp.prototype.bootStrapErrorHandlers = function () {
        this._express.use(function (err, req, res, next) {
            res.status(500).json({
                error: err.message
            });
        });
    };
    ExpressApp.prototype.bootstrapRunTimeExeptions = function () {
        var _this = this;
        process.on('uncaughtException', function (err) {
            console.error(err);
            _this.stop(1);
        });
    };
    ExpressApp.prototype.start = function (port) {
        var PORT = Number(process.env.PORT) || port || 3000;
        this._express.listen(PORT, "0.0.0.0", function () {
            console.log("Server is running on port ".concat(PORT));
        });
    };
    ExpressApp.prototype.stop = function (exitCode) {
        process.exit(exitCode);
    };
    return ExpressApp;
}());
exports.ExpressApp = ExpressApp;
