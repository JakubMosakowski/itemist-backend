import { } from './config/env.js'
import cors from 'cors'
import errorHandler from './error/ErrorHandler.js'
import express from 'express'
import morgan from 'morgan'
import { publicRoutes, protectedRoutes } from './routing/router.js'

const app = express();
const { PORT } = process.env

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/public', publicRoutes);
app.use('/api', protectedRoutes);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App running on localhost: ${PORT}`)
});

