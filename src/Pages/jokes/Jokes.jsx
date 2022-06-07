import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getJokes } from "./features/jokeSlice";
import CircularProgress from "@material-ui/core/CircularProgress";

const Jokes = () => {
  const { jokes, loading } = useSelector((state) => state.joke);
  console.log(jokes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loaderstyle = {
    display: "flex",
    justifyContent: "center",
    marginTop:"200px"
  };

  useEffect(() => {
    if (!localStorage.getItem("credauth")) {
      navigate("/login");
    } else {
      dispatch(getJokes());
    }
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Fetch data</h1>
      ) : (
        <div style={loaderstyle}>
          <CircularProgress color="secondary" />
        </div>
      )}
      {/* {jokes.map((item)=>{
         return (
          <h2>{item.jokes.category}</h2>
         )
         
       })} */}
    </div>
  );
};

export default Jokes;
