import {initializeApp} from "firebase/app"; 
import {getDatabase } from "firebase/database";


const firebaseConfig = {
    databaseURL: "https://muze-ca804-default-rtdb.firebaseio.com",
    projectid: "muze-ca8e4",
    authDomain: "muze-ca884.firebaseapp.com",
    apiKey: "AIzaSyA5z6nKYZcqirM9wdkmix7G1enIVrCU68w",
    messagingSenderId: "833438317630", 
    appId: "1:833438317630:web:88adfec391da21d6ede56f",
    storageBucket: "muze-ca804.appspot.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };