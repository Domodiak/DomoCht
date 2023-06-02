//import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="register/" Component={Register}/>
      </Routes>
    </Router>
  );
}

export default App;
