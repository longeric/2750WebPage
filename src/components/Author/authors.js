import React, { Component } from "react";
import "./authors.css";

class Authors extends Component {
  constructor() {
    super();
    console.log("constructor");
    this.state = { authors: [] };
  }

  // static getDerivedStateFromProps(){
  //   console.log("getDerivedStateFromProps");
  //   return {authors :[]};
  // }
  
  componentDidMount() {
    console.log("componentDidMount");
    fetch("/api/author")
      .then(res => res.json())
      .then(authors =>
        this.setState({ authors }, () =>
          console.log("Fetch data ... ", authors)
        )
      );
  }

  render() {
    console.log("render");
    return (
      <div>
        <h2>Authors</h2>
        <ul>
          {this.state.authors.map(item => {
            return <li key={item._id}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Authors;
