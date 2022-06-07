import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { NoteAdd } from "@material-ui/icons";
import api from "./api/task";

const Createtask = () => {
  let today = new Date().toLocaleDateString();
  const [task, settask] = useState({
    id: uuidv4(),
    taskname: "",
    description: "",
    starttime: "",
    endtime: "",
    status: "scheduled",
    assigndate: today
  });

  const [error, seterror] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    if (!localStorage.getItem("credauth")) {
      navigate("/login");
    }
  });

  const { taskname, description, starttime, endtime } = task;

  const handletask = (e) => {
    e.preventDefault();
    console.log(task);
    if (!task || !description || !starttime || !endtime) {
      seterror("All fields are necessary");
    } else {
      api
        .post("http://localhost:3500/task", task)
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
            <NoteAdd />
          </Avatar>
          <h3>Create Task</h3>
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={btnstyle}
            onClick={handletask}
          >
            Create task
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Createtask;
