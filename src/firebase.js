import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyBYrPYORN8Krm0P-cpKNtp0RonaPCFIVZw",
    authDomain: "raudevhack.firebaseapp.com",
    databaseURL: "https://raudevhack.firebaseio.com",
    projectId: "raudevhack",
    storageBucket: "raudevhack.appspot.com",
    messagingSenderId: "433771662326",  
    appId: "1:433771662326:web:530805e5112e3328dad5d7"
  };

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp