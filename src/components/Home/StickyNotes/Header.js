import React from "react";

var Header = props => (
  <header className="app-header">
    <h1 className="app-header__title">Sticky Notes</h1>
    <aside className="app-header__controls">
      <button className="add-new" onClick={props.addNote}>
        {" "}
        + New Note{" "}
      </button>
      <button className="add-new" onClick={props.saveNote}>
        Save All
      </button>
    </aside>
  </header>
);

export default Header;
