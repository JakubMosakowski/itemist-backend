import validator from 'express-validator'
import { addUser, userExists } from '../database/entities/user.js'
import { INTERNAL_SERVER_ERROR } from '../error/Error.js'
const { body, validationResult } = validator

export function validate(method) {
    switch (method) {
        case 'createUser': {
            return [
                body('username').exists().isLength({ min: 1 }).withMessage('Username cannot be empty.'),
                body('email', 'Email is taken')
                    .exists()
                    .withMessage('Email cannot be empty.')
                    .isEmail()
                    .withMessage('Email is invalid.')
                    .custom(verifyUser)
                    .withMessage('Email is already taken.'),
                body('password', 'Password too is too weak').exists().isLength({ min: 8 })
            ]
        }
    }
}

async function verifyUser(email) {
    const exists = await userExists(email)

    if (exists)
        return Promise.reject()
}

export async function createUser(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }

        const { username, email, password } = req.body

        await addUser(username, email.toLowerCase(), password)
        console.log("Successfully added a user!")

        res
            .status(201)
            .json()
    } catch (error) {
        console.error(`Something went wrong during user creation: "${error}"`)
        return next(INTERNAL_SERVER_ERROR)
    }
}