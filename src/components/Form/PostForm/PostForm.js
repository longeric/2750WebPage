import React, { Component } from "react";
import useStyle from "./style";

export default class PostForm extends Component {
  constructor() {
    super();
    this.classes = useStyle;
  }

  render() {
    return (
      <>
        <h1>New Post</h1>
        <form className={this.classes.form}>
          <label value="name" />
          <input id="name"></input>
        </form>
      </>
    );
  }
}
