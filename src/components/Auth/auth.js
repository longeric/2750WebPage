import React from "react";
import axios from 'axios';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./style";
import Input from './input.js';

const Auth = () => {
  const classes = useStyles();

  const isSignup = false;

  const switchMode = () => {
    // setForm(initialState);
    // setIsSignup((prevIsSignup) => !prevIsSignup);
    // setShowPassword(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    var user = JSON.stringify({email: e.target.email.value, password: e.target.email.password})
    console.log(e.target.email.value)
    // await axios.post("/api/login", user)
    if(await axios.get("/api/auth/users")){
      // this.push('/home')
    }
    // if (isSignup) {
    //   dispatch(signup(form, history));
    // } else {
    //   dispatch(signin(form, history));
    // }
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
    // setForm({ ...form, [e.target.name]: e.target.value });
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
            />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
