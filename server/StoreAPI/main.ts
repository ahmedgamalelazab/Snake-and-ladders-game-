import 'reflect-metadata';
import { ExpressApp } from './src';

const app = new ExpressApp();

setImmediate(() => {
    app.start();
});
