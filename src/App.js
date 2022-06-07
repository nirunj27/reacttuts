import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login/Login.jsx";
import "./App.css";
import Createtask from "./Pages/task/Createtask.jsx";
import ViewTask from "./Pages/task/ViewTask.jsx";
import Edittask from "./Pages/task/Edittask.jsx";
import Jokes from "./Pages/jokes/Jokes.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getJokes } from "./Pages/jokes/features/jokeSlice";
import CircularProgress from "@material-ui/core/CircularProgress";

const App = () => {
  // const dispatch = useDispatch();
  // const {jokes,loading} = useSelector((state)=>state.joke)

  // useEffect(()=>{
  //   dispatch(getJokes())
  // },[])
  return (
    <div>
      <Router>
        <Routes>
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
