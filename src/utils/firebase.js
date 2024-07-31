// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzyQj3KxbOC4fG7BE8n0FUA_ql-MqixyU",
    authDomain: "login-system-5e1f5.firebaseapp.com",
    projectId: "login-system-5e1f5",
    storageBucket: "login-system-5e1f5.appspot.com",
    messagingSenderId: "268629514309",
    appId: "1:268629514309:web:6b5d3f8b5a1b754d11eb2c",
    measurementId: "G-BXCXW4JD04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();