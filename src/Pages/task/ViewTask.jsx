import React, { useState, useEffect } from "react";
import api from "./api/task";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { IconButton, Fab } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Edit, Delete, Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const ViewTask = () => {
  const navigate = useNavigate();
  const [alltasks, setalltasks] = useState([]);
  const [query, setquery] = useState("");

  //Retrieve Task
  const Retrievetask = async () => {
    const response = await api.get("/task");
    return response.data;
  };

  useEffect(() => {
    if (!localStorage.getItem("credauth")) {
      navigate("/login");
    } else {
      const getAllTask = async () => {
        const alltask = await Retrievetask();
        if (alltask) setalltasks(alltask);
        console.log(alltask);
      };
      getAllTask();
    }
  }, []);

  const handletaskdelete = async (id) => {
    await api.delete(`task/${id}`);
    const newtasklist = alltasks.filter((alltask) => {
      return alltask.id !== id;
    });
    setalltasks(newtasklist);
  };

  const classes = useStyles();
  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 800,
    margin: "30px auto",
  };

  const tableheadStyle = {
    backgroundColor: "#239191",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
  };

  const headerstyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      <div style={headerstyle}>
        <h3>View Task</h3>
        <input
          type="search"
          placeholder="search task"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
      </div>

      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={tableheadStyle}>
            <TableRow align="center">
              <TableCell>Taskname </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alltasks
              .filter((alltask) =>
                alltask.taskname.toLowerCase().includes(query) || alltask.assigndate.includes(query)
                 || alltask.status.toLowerCase().includes(query)
              )
              .map((alltask) => (
                <TableRow key={alltask.id} align="center">
                  <TableCell component="th" scope="row">
                    {alltask.taskname}
                  </TableCell>
                  <TableCell>{alltask.description}</TableCell>
                  <TableCell>{alltask.starttime}</TableCell>
                  <TableCell>{alltask.endtime}</TableCell>
                  <TableCell >{alltask.status}</TableCell>
                  <TableCell>{alltask.assigndate}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => {
                        handletaskdelete(alltask.id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <Link to={`/edittask/${alltask.id}`}>
                      <IconButton aria-label="edit" color="primary">
                        <Edit />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab color="primary" aria-label="add" style={{marginTop:"20px"}}>
        <Add onClick={() => navigate("/createtask")} />
      </Fab>
    </Paper>
  );
};

export default ViewTask;
