//import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet";
import Index from "./pages/Index/Index";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <Helmet>
        <title>DomoCht - Index</title>
      </Helmet>
      <Router>
        <Routes>
          <Route index Component={Index}/>
          <Route path="register/" Component={Register}/>

          <Route path="*" Component={NotFound}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
