const firebase = require("firebase");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAJ5sjkMtjWuJ1YVFEU0oHap3o7i-dGmIM",
  authDomain: "food-tracker-5af0c.firebaseapp.com",
  databaseURL: "https://food-tracker-5af0c.firebaseio.com",
  projectId: "food-tracker-5af0c",
  storageBucket: "food-tracker-5af0c.appspot.com",
  messagingSenderId: "1035437931900",
  appId: "1:1035437931900:web:8e7aae22eaf447c4a1f8f9",
  measurementId: "G-KRG1EJ72J6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;