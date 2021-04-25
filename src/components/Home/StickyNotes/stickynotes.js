import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";
import "./stickynotes.css";
import { readNote, saveNote } from "../../../actions/saveNote.js";

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
    searchText: "",
    isload: false
  };

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
    var searchText = e.target.value.toLowerCase();
    var updatedNotes = this.state.notes.map(note => {
      if (!searchText) {
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
    var notIdMatch = note => note.id !== deleteMeId;
    var updatedNotes = this.state.notes.filter(notIdMatch);
    this.setState({ notes: updatedNotes });
  };

  async saveToNote() {
    if (window.confirm("Do you want to save note change")) {
      var res = await saveNote(
        localStorage.email,
        localStorage.getItem("savedNotes")
      );
      console.log(res);
    }
    // console.log(response);

    // const res = await saveNote(
    //   localStorage.email,
    //   localStorage.getItem("savedNotes")
    // );
    // console.log(res);
  }

  componentDidUpdate() {
    var stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  async componentWillMount() {
    const data = await readNote(localStorage.email);
    console.log(data.unschedule);

    localStorage.setItem("savedNotes", JSON.stringify(data.unschedule));

    if (data.unschedule) {
      this.setState({ isload: true });
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
        {this.state.isload && (
          <NotesList
            notes={this.state.notes}
            onType={this.onType}
            remove={this.remove}
          />
        )}
      </div>
    );
  }
}

export default App;
