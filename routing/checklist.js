import express from 'express'
const router = express.Router()

// It is test endpoint to verification whether token is still valid.
router.get(
    '/test',
    (req, res, next) => {
        //TODO add token verification.

        res
            .status(200)
            .json()
    }
)


export const checklistRouter = router