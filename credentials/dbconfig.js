import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('credentials/.env') });

export default function config() {
    const serviceAccount = fs.readFileSync(new URL('admin.json', import.meta.url), 'utf8')

    return {
        credential: admin.credential.cert(JSON.parse(serviceAccount)),
        databaseURL: process.env.DATABASE_URL
    }
}