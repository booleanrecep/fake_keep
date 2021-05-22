import React from 'react';
import AddCard from './AddCard';
import NoteCard from './NoteCard';
import { connect } from 'react-redux';
import './App.scss';

const mapStateToProps = notes => {
  return { notes: notes };
};

function App({ notes }) {
  return (
    <>
      <AddCard />
      <div className="note-container">
        {notes.notes.map(cardInfo => (
          <NoteCard {...cardInfo} />
        ))}
      </div>
    </>
  );
}

export default connect(mapStateToProps)(App);
