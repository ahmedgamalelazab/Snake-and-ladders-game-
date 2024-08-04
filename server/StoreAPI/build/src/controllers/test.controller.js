"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (router) {
    router.get('/test', function (req, res) {
        res.json({
            message: 'Hello World'
        });
    });
    return router;
});
