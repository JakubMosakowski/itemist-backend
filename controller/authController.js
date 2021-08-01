import validator from 'express-validator'
import { getUser } from '../database/entities/user.js'
import { verifyPassword } from '../auth/password.js'
import jsonwebtoken from 'jsonwebtoken'
import { FAILED_LOGIN_ERROR } from '../error/Error.js'
const { body, validationResult } = validator
const { JWT_SECRET } = process.env

export function validate(method) {
    switch (method) {
        case 'login': {
            return [
                body('email').exists().isLength({ min: 1 }).withMessage('Email cannot be empty.'),
                body('password').exists().isLength({ min: 1 }).withMessage('Password cannot be empty.')
            ]
        }
    }
}

export async function login(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        const { email, password } = req.body

        // Fetch the user.
        const matchingUser = await getUser(email)
        if (!matchingUser)
            return next(FAILED_LOGIN_ERROR)

        // Verify the user.
        const isMatching = await verifyPassword(matchingUser.password, password)
        if (!isMatching)
            return next(FAILED_LOGIN_ERROR)

        const response = generateLoginResponse(matchingUser)

        res
            .status(201)
            .json(response)
    } catch (error) {
        console.error(`Something went wrong during user login: "${error}"`)
        return next(INTERNAL_SERVER_ERROR)
    }
}

export function generateLoginResponse(user) {
    const jwtData = { user: user.email }

    // Don't send user's password even if it's hashed.
    delete user.password

    return {
        accessToken: jsonwebtoken.sign(jwtData, JWT_SECRET),
        user
    }
}
