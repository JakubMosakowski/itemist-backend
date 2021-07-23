import admin from 'firebase-admin'
import config from '../credentials/dbconfig.js'

admin.initializeApp(config());
export const db = admin.database()