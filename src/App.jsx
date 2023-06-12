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

function App() {
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
