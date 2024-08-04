"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execOnlyDevEnv = execOnlyDevEnv;
function execOnlyDevEnv(callback) {
    var _a;
    var environment = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development';
    if (environment === 'development') {
        callback();
    }
}
