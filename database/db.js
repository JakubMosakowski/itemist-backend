import admin from 'firebase-admin'
import config from '../config/dbconfig.js'

admin.initializeApp(config());
export const db = admin.database()

export function parseSnapshotWithOneValue(snapshot) {

    snapshot = snapshot.val()
    if (!snapshot) return null

    return Object.values(snapshot)[0]
}