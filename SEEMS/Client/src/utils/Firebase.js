import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyDycImjluiHcVVAGKke_UqqbNjxFz8xrwU',
    authDomain: 'my-web-apps-875f8.firebaseapp.com',
    projectId: 'my-web-apps-875f8',
    storageBucket: 'my-web-apps-875f8.appspot.com',
    messagingSenderId: '216048446416',
    appId: '1:216048446416:web:76399f497386f240b927d5',
    measurementId: 'G-WQ96671RZL',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
