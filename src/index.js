import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDr9Xn0gJWngjIGWwxbmLg7Q-Aw8iKsHt8",
  authDomain: "domocht.firebaseapp.com",
  databaseURL: "https://domocht-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "domocht",
  storageBucket: "domocht.appspot.com",
  messagingSenderId: "744420899507",
  appId: "1:744420899507:web:9328b17fd7adb580fa0ec6",
  measurementId: "G-XHK396DF1J"
};
initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
