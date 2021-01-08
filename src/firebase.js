import firebase from "firebase";
import "firebase/database";

/*
let config = {
  apiKey: "xxx",
  authDomain: "bezkoder-firebase.firebaseapp.com",
  databaseURL: "https://bezkoder-firebase.firebaseio.com",
  projectId: "bezkoder-firebase",
  storageBucket: "bezkoder-firebase.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx",
};*/

var config = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXX",
  databaseURL: "https://crud-react-firebase-cb064-default-rtdb.firebaseio.com",
  measurementId: "XXXXXXXXXXXXXXXXXXX"
};

firebase.initializeApp(config);


export default firebase.database();
