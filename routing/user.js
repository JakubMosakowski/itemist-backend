import express from 'express'
import { validate, createUser } from '../controller/userController.js'
const router = express.Router()

router.post(
    '/signup',
    validate('createUser'),
    createUser
)

export const userRouter = router