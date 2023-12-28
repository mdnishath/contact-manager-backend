import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

//parse
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, message: 'Welcome to Startup api' });
  } catch (error) {
    next(error);
  }
});

//user routes
app.use('/api/v1', router);

//global error handler
app.use(globalErrorHandler);

export default app;
