export default function errorHandler(error, _req, res, _next) {

    console.log("An error occurred: ")
    console.log(`Error: ${error.status} - ${error.message}`)

    res
        .status(error.status)
        .json(error)
}