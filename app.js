import cookieParser from 'cookie-parser'
import cors from 'cors'
import errorHandler from './error/ErrorHandler.js'
import express from 'express'
import morgan from 'morgan'
import { routes } from './routing/router.js'

const app = express();
const { PORT } = process.env

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.use(routes);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App running on localhost: ${PORT}`)
});

