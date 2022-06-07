import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";

const Login = () => {
  const [user, setuser] = useState({
    username: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate()

  const creduser = "admin";
  const credpass = "admin@123";

  const paperStyle = {
    padding: 20,
    height: "60vh",
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

  const { username, password, error } = user;

  const handlelogin = (e) => {
    e.preventDefault();
    //console.log(username,password)
    if (!username || !password) {
      setuser({ error: "All fields are necessary" });
    } else if (username !== creduser || password !== credpass) {
      setuser({
        username: "",
        password: "",
        error: "Please enter valid credentials",
      });
    }else{
        setuser({error:""})
        localStorage.setItem('credauth',JSON.stringify(user))
        navigate('/createtask')
    }
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <Lock />
          </Avatar>
          <h3>Login Form</h3>
          <hr />
        </Grid>
        <span style={{color:"red"}}>{error}</span>
        <form>
          <TextField
            label="Username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setuser({ ...user, username: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={btnstyle}
            onClick={handlelogin}
          >
            Login
          </Button>
        </form>
        <Typography>
          <Link href="#">Forgot Password</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
