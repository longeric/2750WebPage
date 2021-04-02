import React from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from "../../style";

const Auth = () => {
  const classes = useStyles();
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={}>
      </Paper>
    </Container>
  )
}

export default Auth;