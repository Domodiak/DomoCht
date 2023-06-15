//import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet";
import Index from "./pages/Index/Index";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import UserContext from "./context/userContext";
import Login from "./pages/Login/Login";
import useUser from "./etc/useUser";
import Channel from "./pages/Channel/Channel";
import CreateServer from "./pages/CreateServer/CreateServer";
import { initializeApp } from "firebase/app";

function App() {
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
  initializeApp(firebaseConfig); //this has been thrown back and forth between App.jsx and index.js like 3 times already

  const [ loading, userData ] = useUser()

  return (
    <>
      <Helmet>
        <title>DomoCht - Index</title>
      </Helmet>
      { loading ? <div>Loading....</div> :
        <UserContext.Provider value={userData}>
          <Router>
            <Routes>
              <Route index Component={Index}/>
              <Route path="login/" Component={Login}/>
              <Route path="register/" Component={Register}/>
              <Route path="*" Component={NotFound}/>
              <Route path="server/:sid/:cid/" Component={Channel}/>
              <Route path="new-server/" Component={CreateServer} />
            </Routes>
          </Router>
        </UserContext.Provider>    
      }
    </>
  );
}

export default App;
