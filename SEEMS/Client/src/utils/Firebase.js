import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

import {
    FIREBASE_apiKey,
    FIREBASE_authDomain,
    FIREBASE_projectId,
    FIREBASE_storageBucket,
    FIREBASE_messagingSenderId,
    FIREBASE_appId,
    FIREBASE_measurementId,
} from '../config'

const firebaseConfig = {
    apiKey: FIREBASE_apiKey,
    authDomain: FIREBASE_authDomain,
    projectId: FIREBASE_projectId,
    storageBucket: FIREBASE_storageBucket,
    messagingSenderId: FIREBASE_messagingSenderId,
    appId: FIREBASE_appId,
    measurementId: FIREBASE_measurementId,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
