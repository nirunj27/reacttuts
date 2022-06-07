import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import api from "./api/task";
import axios from "axios"

const Edittask = () => {
  const params = useParams();
  const taskid = params.id;
  let today = new Date().toLocaleDateString();
  const [task, settask] = useState({
    id: "",
    taskname: "",
    description: "",
    starttime: "",
    endtime: "",
    status: "",
    assigndate:"",
  });

  const [error, seterror] = useState("");

  const navigate = useNavigate();

  

 

  useEffect(() => {
    if (!localStorage.getItem("credauth")) {
      navigate("/login");
    } else {
      api.get("/task/"+taskid).then((resdata)=>{
        console.log(resdata.data)
        settask(resdata.data)
      })
      
      
    }
  }, []);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "30px auto",
  };
  const avatarStyle = {
    backgroundColor: "#99f2df",
    marginBottom: "10px",
  };
  const btnstyle = {
    margin: "15px 0px",
    backgroundColor: "#239191",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
  };

  const { taskname, description, starttime, endtime, status } = task;

  const handletask = (e) => {
    e.preventDefault();
    console.log(task);
    if (!task || !description || !starttime || !endtime || !status) {
      seterror("All fields are necessary");
    } else {
      api
        .put("/task/"+taskid, task)
        .then((res) => {
          seterror("");
          navigate("/viewtask");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <Edit />
          </Avatar>
          <h3>Edit Task</h3>
          <hr />
        </Grid>
        <span style={{ color: "red" }}>{error}</span>
        <form>
          <TextField
            label="Taskname"
            placeholder="Enter Taskname"
            fullWidth
            required
            value={taskname}
            onChange={(e) => settask({ ...task, taskname: e.target.value })}
          />
          <TextField
            label="Description"
            placeholder="Enter Task Description"
            fullWidth
            required
            value={description}
            onChange={(e) => settask({ ...task, description: e.target.value })}
          />
          <TextField
            label="Start time"
            type="time"
            fullWidth
            required
            value={starttime}
            onChange={(e) => settask({ ...task, starttime: e.target.value })}
          />
          <TextField
            label="End time"
            type="time"
            fullWidth
            required
            value={endtime}
            onChange={(e) => settask({ ...task, endtime: e.target.value })}
          />
          <TextField
            label="status"
            type="text"
            fullWidth
            required
            value={status}
            onChange={(e) => settask({ ...task, status: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={btnstyle}
            onClick={handletask}
          >
            Edit task
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Edittask;
