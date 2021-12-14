import { useContext,useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import React from "react";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes,getNotes } = context;
  useEffect(() => {
     getNotes()
  },[])
  return (
    <>
      <AddNote />
      <div className="row my-1">
        <h3>Your Notes</h3>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
