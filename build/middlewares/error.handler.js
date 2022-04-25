"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomErrorHandler = exports.errorHandler = exports.logErrors = void 0;
const logErrors = (err, _req, _res, next) => {
    console.log('logerrors');
    console.error(err);
    next(err);
};
exports.logErrors = logErrors;
const errorHandler = (err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    console.log('errorHandler');
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
};
exports.errorHandler = errorHandler;
const boomErrorHandler = (err, _req, res, next) => {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
};
exports.boomErrorHandler = boomErrorHandler;
