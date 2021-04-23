import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";
import "./stickynotes.css"
import { readNote, saveNote } from "../../../actions/saveNote.js";

/* This container component manages all of the state 
for this application, delegating rendering logic to 
presentational components. */
class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };
  /* This method will add a new object to the notes array in the App state */
  addNote = () => {
    var newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    var newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    /* this event handler updates the sticky note text fields
      - editMeId: the id of the note that the user typed in
      - updatedKey: which field was edited? 'title' or 'description'
      - updatedValue: new value of edited field */
    var updateIdMatch = note => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          return {
            ...note,
            title: updatedValue
          };
        } else {
          return {
            ...note,
            description: updatedValue
          };
        }
      }
    };
    var updatedNotes = this.state.notes.map(updateIdMatch);
    this.setState({ notes: updatedNotes });
  };

  onSearch = e => {
    /* toggle the doesMatchSearch boolean value of each sticky
    note when the user types in the search field.
    set the doesMatchSearch value to true for a sticky note if
    it's title or description matches the search string. */
    var searchText = e.target.value.toLowerCase();
    var updatedNotes = this.state.notes.map(note => {
      if (!searchText) {
        /* If the search field is empty, then
      we set the doesMatchSearch value for every note to true. */
        return {
          ...note,
          doesMatchSearch: true
        };
      } else {
        var title = note.title.toLowerCase();
        var description = note.description.toLowerCase();
        var titleMatch = title.includes(searchText);
        var descriptionMatch = description.includes(searchText);
        var hasMatch = titleMatch || descriptionMatch;
        return {
          ...note,
          doesMatchSearch: hasMatch
        };
      }
    });
    this.setState({
      searchText: searchText,
      notes: updatedNotes
    });
  };

  remove = deleteMeId => {
    /* remove note by id of the note that the user clicked on */
    var notIdMatch = note => note.id !== deleteMeId;
    var updatedNotes = this.state.notes.filter(notIdMatch);
    this.setState({ notes: updatedNotes });
  };
  
  saveToNote() {
    // console.log("anything in save to note");
    // console.log(localStorage.getItem("savedNotes"));
    // console.log(this.state.notes);
    // storage this to DB
    // const json = ({"json":localStorage.getItem("savedNotes")});
    const res = saveNote(localStorage.email, localStorage.getItem("savedNotes"));
    console.log(res);
  }
  
  componentDidUpdate() {
    /* Using lifecycle methods. after each render, save notes data to local storage */
    var stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }
  
  async componentDidMount() {
    /* after rendering for the first time, read saved
    notes data from local storage and pass that data
    to component state if it exists */
    const data = await readNote(localStorage.email);
    console.log(data.unschedule);
    
    localStorage.setItem("savedNotes", JSON.stringify(data.unschedule));
    // console.log("before call read to note did mount");
    // var stringifiedNotes = localStorage.getItem("savedNotes");
    
    if (data.unschedule) {
      var savedNotes = JSON.parse(JSON.stringify(data.unschedule));
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          addNote={this.addNote}
          onSearch={this.onSearch}
          saveNote={this.saveToNote}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          remove={this.remove}
        />
      </div>
    );
  }
}

export default App;
