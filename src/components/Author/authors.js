import React, { Component } from "react";
import "./authors.css";

class Authors extends Component {
  constructor() {
    super();
    this.state = { authors: [] };
  }

  componentDidMount() {
    fetch("/api/author")
      .then(res => res.json())
      .then(authors =>
        this.setState({ authors }, () =>
          console.log("Fetch data ... ", authors)
        )
      );
  }

  render() {
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
