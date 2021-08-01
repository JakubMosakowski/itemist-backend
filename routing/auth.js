import express from 'express'
const router = express.Router()
import { validate, login } from '../controller/authController.js'


router.post(
    '/login',
    validate('login'),
    login,
)


export const authRouter = router