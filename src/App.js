import React from "react";
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import Login from "./Pages/login/Login.jsx";
import "./App.css";
import Createtask from "./Pages/task/Createtask.jsx";
import ViewTask from "./Pages/task/ViewTask.jsx";
import Edittask from "./Pages/task/Edittask.jsx";
import Jokes from "./Pages/jokes/Jokes.jsx";
import "./App.css"


const App = () => {
  
  return (
    <div className="App">
    

      <Router>
        <navbar>
          <Link to="/login">login</Link>
          <Link to="/createtask">Createtask</Link>
          <Link to="/viewtask">Viewtask</Link>
          <Link to="/jokesspot">jokesspot</Link>
        </navbar>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/jokesspot" element={<Jokes/>}></Route>
          <Route path="/" element={<h2 style={{textAlign:"center"}}>Task Management</h2>}></Route>

          <Route path="/createtask" element={<Createtask />}></Route>
          <Route path="/viewtask" element={<ViewTask />}></Route>
          <Route path="/edittask/:id" element={<Edittask />}></Route>
          {/* <Route path="/jokesspot" element={<Jokes />}></Route> */}

          <Route path="*" element={<h2>Page is Not Found</h2>}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
