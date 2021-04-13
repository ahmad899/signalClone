import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2a8U09Vv4orgJWqhwUMlm_Wbe87RE4zE",
  authDomain: "signal-clone-yt-4d1b0.firebaseapp.com",
  projectId: "signal-clone-yt-4d1b0",
  storageBucket: "signal-clone-yt-4d1b0.appspot.com",
  messagingSenderId: "304195443330",
  appId: "1:304195443330:web:9c3d9b50205e46bb1af29b",
  measurementId: "G-5V36ZDZGW6",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
