import jsonwebtoken from 'jsonwebtoken'
import express from 'express'
import Error from '../error/Error.js'
import { getUser } from '../database/entities/user.js'
import { verifyPassword } from '../auth/password.js'
const router = express.Router()
const { JWT_SECRET } = process.env

//TODO add jwt handling on some routes
// import jwt from 'express-jwt'
// router.use(jwt({ secret: JWT_SECRET, algorithms: ['HS256'] }));

//TODO add validator for fields
// router.post(
//     '/login',
//     authController.validate('login'),
//     authController.login,
// )

// async (req, res, next) => {

//     const { email, password } = req.body

//     // Verify the body.
//     if (!email || !password)
//         return next(FAILED_LOGIN_ERROR)

//     // Fetch the user.
//     const matchingUser = await getUser(email)
//     if (!matchingUser)
//         return next(FAILED_LOGIN_ERROR)

//     // Verify the user.
//     const isMatching = await verifyPassword(matchingUser.password, password)
//     if (!isMatching) return next(FAILED_LOGIN_ERROR)

//     const response = generateJwtResponse(email)
//     res
//         .status(200)
//         .json(response)

// });

// function generateJwtResponse(email) {
//     const jwtData = { user: email }

//     return {
//         token: jsonwebtoken.sign(jwtData, JWT_SECRET)
//     }
// }

const FAILED_LOGIN_ERROR = new Error(401, 'Email or password is incorrect.')

export const authRouter = router