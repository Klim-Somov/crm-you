

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDy6z9H7W3is1CpnBpFZrFuQQxhbnHj5Bc",
    authDomain: "vue-payments.firebaseapp.com",
    databaseURL: "https://vue-payments-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vue-payments",
    storageBucket: "vue-payments.appspot.com",
    messagingSenderId: "2526349228",
    appId: "1:2526349228:web:1cdbf1d08f0e7522ac5c09",
    measurementId: "G-BBX5QQH9ME"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const database = getDatabase(app);



export { auth, database }