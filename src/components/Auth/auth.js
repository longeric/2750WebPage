import React from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "../../style";

const Auth = () => {
  const classes = useStyles();

  const isSignup = false;

  const switchMode = () => {
    // setForm(initialState);
    // setIsSignup((prevIsSignup) => !prevIsSignup);
    // setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => {
    // setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avater}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Log in"}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
            />
            {isSignup && <></>}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
