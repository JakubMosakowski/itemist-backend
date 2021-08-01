import { authRouter } from './auth.js'
import { checklistRouter } from './checklist.js'
import { userRouter } from './user.js'

export const routes = [
    authRouter,
    checklistRouter,
    userRouter
]