import admin from 'firebase-admin'
import fs from 'fs'

export default function config() {
    const serviceAccount = fs.readFileSync(new URL('admin.json', import.meta.url), 'utf8')

    return {
        credential: admin.credential.cert(JSON.parse(serviceAccount)),
        databaseURL: process.env.DATABASE_URL
    }
}