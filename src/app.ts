import express from 'express';
import routerApi from './routes';
import cors from 'cors';
import morgan from 'morgan';
import {
  errorHandler,
  logErrors,
  boomErrorHandler,
} from '@middlewares/error.handler';
import '@utils/auth';

const app = express();

app.use(express.json());

// const WHITE_LIST = ['http://localhost:8080', 'https://app.com'];
// const options = {
//   origin: (origin, callback) => {
//     if (WHITE_LIST.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Cross origin not allowed'));
//     }
//   }
// };
// app.use(cors(options));
app.use(cors());
app.use(morgan('dev'));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

export default app;
