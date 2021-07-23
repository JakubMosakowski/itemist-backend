import { db } from "../db.js"

export function addUser(name, avatarUrl) {

    const usersRef = db.ref().child(`users`);

    console.log("Create new user entity...")
    var newUserEntityRef = usersRef.push();
    const user = {
        avatarUrl,
        name,
        id: newUserEntityRef.key
    }

    console.log("Fill user entity with data...")
    newUserEntityRef.set(user, onAddUserCompleted)
}

function onAddUserCompleted(error) {
    if (error) {
        console.log("Something went wrong during user creation:")
        console.log(error)
    }
    else {
        console.log("Successfully added a user!")
    }
}