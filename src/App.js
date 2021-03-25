import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Authors from "./components/Author/authors";
import PostForm from "./components/Form/PostForm/PostForm.js";
import Posts from "./components/Posts/Posts.js";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import useStyles from "./style";

const App = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.AppBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          <img
            className={classes.image}
            src="https://cdn.glitch.com/b32b2bd2-2e97-4726-9fc6-3c049530080e%2Fworkout.png?v=1616639766877"
            alt="workout icon"
            height="70"
            width="150"
            align="center"
          />
          Workout Blog
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={7}>
              <PostForm />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <Authors />
    </Container>
  );
};

export default App;
