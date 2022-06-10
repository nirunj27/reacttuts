import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getJokes } from "./features/jokeSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const Jokes = () => {
  const { jokes, loading } = useSelector((state) => state.joke);
  console.log(typeof jokes);
  console.log(jokes);
  console.log(Array.isArray(jokes))
  //   console.log(loading);
  //   console.log(Object.values(jokes));
  //   console.log(typeof Object.keys(jokes));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 800,
    margin: "30px auto",
  };

  const loaderstyle = {
    marginTop: "200px",
    display: "flex",
    justifyContent: "center",
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

  useEffect(() => {
    if (!localStorage.getItem("credauth")) {
      navigate("/login");
    } else {
      dispatch(getJokes());
    }
  }, []);

  const tablefontstyle = {
    fontFamily: "'Bangers', cursive",
  };

  return (
    <Paper elevation={10} style={paperStyle}>
      <div style={headerstyle}>
        <h3>View Jokes</h3>
      </div>

      {!loading && Array.isArray(jokes) == false ? (
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={tableheadStyle}>
              <TableRow align="center">
                <TableCell style={tablefontstyle}>Category</TableCell>
                <TableCell style={tablefontstyle}>Jokes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jokes.jokes.map((item, i) => {
                return (
                  <TableRow align="center" key={i}>
                    <TableCell style={tablefontstyle}>
                      {item.category}
                    </TableCell>
                    <TableCell style={tablefontstyle}>
                      {item.joke}
                    </TableCell>
                  </TableRow>
                );
                // });

                //  })
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={loaderstyle}>
          <CircularProgress></CircularProgress>
        </div>
      )}
    </Paper>
  );
};

export default Jokes;
