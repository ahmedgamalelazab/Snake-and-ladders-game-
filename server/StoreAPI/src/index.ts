import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { execOnlyDevEnv } from './utils/execOnlyDevEnv.util';
import fs from 'fs';
import path from 'path';

export class ExpressApp {

    private _express: Application;

    constructor() {
        this._express = express();
        this.bootStrapMiddlewares.bind(this)();
        this.bootStrapControllers.bind(this)();
        this.bootStrapErrorHandlers.bind(this)();
        this.bootstrapRunTimeExeptions.bind(this)();
    }


    private async bootStrapControllers() {
        const controllersPath = path.join(__dirname, 'controllers');
        fs.readdirSync(controllersPath).forEach(file => {
            import(path.join(controllersPath, file))
                .then(module => {
                    const controller = module.default;
                    const controllerPath = file.split('.')[0];
                    this._express.use(`/api/${controllerPath}`, controller());
                });
        }
        );
    }

    private bootStrapMiddlewares() {
        this._express
        this._express.use(helmet());
        this._express.use(cors());
        execOnlyDevEnv(() => {
            this._express.use(morgan('dev'));
        })
    }

    private bootStrapErrorHandlers() {
        this._express.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(500).json({
                error: err.message
            });
        });
    }

    private bootstrapRunTimeExeptions() {
        process.on('uncaughtException', (err) => {
            console.error(err);
            this.stop(1);
        });
    }

    public start(port?: number) {
        const PORT = Number(process.env.PORT) || port || 3000;
        this._express.listen(PORT, "0.0.0.0", () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }

    public stop(exitCode: number) {
        process.exit(exitCode);
    }

}

