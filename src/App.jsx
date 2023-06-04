//import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet";
import Index from "./pages/Index/Index";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserContext from "./context/userContext";
import Login from "./pages/Login/Login";
import { useEffect, useState } from "react";

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
const auth = getAuth()
function App() {
  const [ user, setUser ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user)
      setLoading(false)
    })
    return unsubscribe
  })

  return (
    <>
      <Helmet>
        <title>DomoCht - Index</title>
      </Helmet>
      { loading ? <div>Loading....</div> :
        <UserContext.Provider value={user}>
          <Router>
            <Routes>
              <Route index Component={Index}/>
              <Route path="login/" Component={Login}/>
              <Route path="register/" Component={Register}/>
              <Route path="*" Component={NotFound}/>
            </Routes>
          </Router>
        </UserContext.Provider>    
      }
    </>
  );
}

export default App;
