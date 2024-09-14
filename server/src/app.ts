import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { errorLogger, infoLogger } from './logger/logger';
import { morganData, morganFormate } from './logger/morgan';

const app = express();

app.use(morgan(morganFormate,morganData))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
export default app