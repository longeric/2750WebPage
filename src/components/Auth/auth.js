import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from 'react-router-dom';
import useStyles from "./style";
import Input from "./input.js";

const initialState = {
  nickName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const Auth = ({ setToken }) => {
  const classes = useStyles();
  const history = useHistory();
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup(prevIsSignup => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    var token;
    
    if (isSignup) {
      let newuser = JSON.stringify({
        nickname: e.target.nickname.value,
        email: e.target.email.value,
        password: e.target.password.value
      });
      
      token = await axios.post("/api/auth/newuser", newuser).then(res => res.data.token);
      console.log(token);
    } else {
      let user = JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value
      });

      token = await axios.post("/api/auth/user", user).then(res => res.data.token);
      console.log(token);
      // console.log(await axios.post("/api/auth/user", user))
    }
    if(token !== undefined){
      setToken(token);
      // console.log(history)
      // history.push('/home')
    }
    
  };

  //   const googleSuccess = async (res) => {
  //     const result = res?.profileObj;
  //     const token = res?.tokenId;

  //     try {
  //       dispatch({ type: AUTH, data: { result, token } });

  //       history.push('/');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  // const googleError = () =>
  //   alert("Google Sign In was unsuccessful. Try again later");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avater}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Log in"}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="nickname"
                  label="nickname"
                  handleChange={handleChange}
                  autoFocus
                />
              </>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              autoFocus
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={() => setShowPassword(!showPassword)}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Log in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

Auth.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Auth;
