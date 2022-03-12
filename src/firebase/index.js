

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBGbFFaeGcEw1u7ohfIZUPSPxh1Dv8PWP4",
    authDomain: "crm-vue-bb123.firebaseapp.com",
    projectId: "crm-vue-bb123",
    storageBucket: "crm-vue-bb123.appspot.com",
    messagingSenderId: "482441627616",
    appId: "1:482441627616:web:635a783896e5de1a584d85",
    measurementId: "G-J1KS1XEH83"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }