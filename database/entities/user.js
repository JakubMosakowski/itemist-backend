import { db, parseSnapshotWithOneValue } from "../db.js"

export async function addUser(username, email, password) {

    const ref = db
        .ref()
        .child("users");

    console.log("Create new user entity...")
    const newUserEntityRef = ref.push();
    const user = {
        id: newUserEntityRef.key,
        username,
        email,
        password
    }

    return await newUserEntityRef.set(user)
}


export async function userExists(email) {
    let exists = await getUser(email)

    return exists
}

export async function getUser(email) {

    console.log(`Getting ${email} user entity...`)

    const ref = db
        .ref()
        .child("users")
        .orderByChild("email")
        .equalTo(email.toLowerCase())
        .limitToFirst(1)

    // Get user.
    const snapshot = await ref.get()

    return parseSnapshotWithOneValue(snapshot)
}