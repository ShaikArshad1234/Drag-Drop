// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDdZfjZFf98yxgJy49iw2MmefvlmYBYCDo",
    authDomain: "dynamicpage-a1501.firebaseapp.com",
    projectId: "dynamicpage-a1501",
    storageBucket: "dynamicpage-a1501.appspot.com",
    messagingSenderId: "1042796774708",
    appId: "1:1042796774708:web:220c39144275e62490d161",
    measurementId: "G-PTDGHK5ETS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get };