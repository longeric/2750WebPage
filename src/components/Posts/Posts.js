import React, { Component } from "react";
import Post from "./Post/Post.js";

export default class Posts extends Component {
  render() {
    return (
      <>
        <h2>Show Posts</h2>
        <Post />
        <Post />
      </>
    );
  }
}
