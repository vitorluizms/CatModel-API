import 'express-async-errors';
import express, { json } from 'express';
import cors from 'cors';
import router from './routes/index.routes.js';
import errorHandlingMiddleware from './middlewares/error-handling.js';

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`--------------- Server running on port ${PORT}`));
