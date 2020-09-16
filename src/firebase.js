import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyB1b8cU4sv01bhbLoyP0MTVRXsdqslVQyA",
    authDomain: "ec-dessert.firebaseapp.com",
    databaseURL: "https://ec-dessert.firebaseio.com",
    projectId: "ec-dessert",
    storageBucket: "ec-dessert.appspot.com",
    messagingSenderId: "695285445757",
    appId: "1:695285445757:web:d6144bc13de6ef9595ad14",
    measurementId: "G-7ZXHKHM458",
};

// Initialize Firebase
let fire = firebase.initializeApp(firebaseConfig);

export default fire;