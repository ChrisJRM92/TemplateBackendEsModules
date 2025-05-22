import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './utils/errorHandler.js';
import morgan from 'morgan';
// import router from './routes'
//---------------------------------------------------------
dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());

// app.use('/api/v1', router);

app.get('/', (req, res) => {
    return res.send("Welcome to express!");
})

app.use(errorHandler)

export default app;