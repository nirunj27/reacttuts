import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login/Login.jsx";
import "./App.css";
import Createtask from "./Pages/task/Createtask.jsx";
import ViewTask from "./Pages/task/ViewTask.jsx";
import Edittask from "./Pages/task/Edittask.jsx";
import Jokes from "./Pages/jokes/Jokes.jsx";


const App = () => {
 
  return (
    <div className="App">
        <h2>Task Management</h2>
         
        <h2>login routes - /login</h2>
        <h2>create task routes - /createtask</h2>
        <h2>edit task routes - /edittask</h2>
        <h2>view task routes - /viewtask</h2>
        <h2>jokes routes - /jokesspot</h2>
      <Router>
        <Routes>
          <Route path="/" element={<h2>Task Management<h2/>}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/createtask" element={<Createtask />}></Route>
          <Route path="/viewtask" element={<ViewTask />}></Route>
          <Route path="/edittask/:id" element={<Edittask />}></Route>
          <Route path="/jokesspot" element={<Jokes />}></Route>

          <Route path="*" element={<h2>Page is Not Found</h2>}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
