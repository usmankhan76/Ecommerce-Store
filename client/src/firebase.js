
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyB1D88uPyLXlhe7cxJpmZRiIYZwH4TMNSQ",
  authDomain: "ecommerce-app-76844.firebaseapp.com",
  projectId: "ecommerce-app-76844",
  storageBucket: "ecommerce-app-76844.appspot.com",
  messagingSenderId: "813452481027",
  appId: "1:813452481027:web:8ca324841b6d169df67436"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);

export const auth=getAuth(app)

export const provider=new GoogleAuthProvider()


