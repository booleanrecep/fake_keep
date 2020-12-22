import React from "react";
import axios from "axios";
import AddCard from "./AddCard";
import NoteCard from "./NoteCard";
import { connect } from "react-redux";
// import { store, getInitialData } from "../redux/index";
// import { Container, Row, Col } from "react-bootstrap";
import "./App.scss";

const mapStateToProps = (notes) => {
  return { notes: notes };
};

function App({ notes }) {
  return (
    <div className="App">
      <AddCard />
      <div id="note-container">
        {notes.notes.map((cardInfo) => (
          <NoteCard {...cardInfo} />
        ))}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
