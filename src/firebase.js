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
  apiKey: "AIzaSyAsDiDTEf2vGA4FbSD5SE8zEshMIqp_Kcg",
  authDomain: "crud-react-firebase-cb064.firebaseapp.com",
  projectId: "crud-react-firebase-cb064",
  storageBucket: "crud-react-firebase-cb064.appspot.com",
  messagingSenderId: "491203176900",
  appId: "1:491203176900:web:f4bb6978d7120237131c91",
  databaseURL: "https://crud-react-firebase-cb064-default-rtdb.firebaseio.com",
  measurementId: "G-9WSKPLSPJW"
};

firebase.initializeApp(config);


export default firebase.database();
