import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesIn = []
  const [notes, setNotes] = useState(notesIn)

// Get all notes*
const getNotes =async () => {
  // API Call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
   method: "GET",
   headers: { 
     "Content-Type": "application/json",
     "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NjRhNDQ5MjA4NzA4Njc3NjZjYzUzIn0sImlhdCI6MTYzNzIzOTQzNX0.votUc7GGfzFlcs-gpT7wXw5l1HO56rQS_78f7oC2sfQ"
  }});
 const json=await response.json()
 setNotes(json)
}

// Add a Note*
  const addNote =async (title, description, tag) => {
     // API Call
     const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NjRhNDQ5MjA4NzA4Njc3NjZjYzUzIn0sImlhdCI6MTYzNzIzOTQzNX0.votUc7GGfzFlcs-gpT7wXw5l1HO56rQS_78f7oC2sfQ"
     },
      body: JSON.stringify({title, description, tag}),
    });

    // 
    const note = {
      _id: "61b43e1cf744fdc1248cf5ae",
      user: "61964a44920870867766cc53",
      title: title,
      description: description,
      tag: tag,
      date: "2021-12-11T05:58:52.575Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  
// Delete a Note*
const deleteNote = async(id) => {
  // API Call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NjRhNDQ5MjA4NzA4Njc3NjZjYzUzIn0sImlhdCI6MTYzNzIzOTQzNX0.votUc7GGfzFlcs-gpT7wXw5l1HO56rQS_78f7oC2sfQ"
   }});
  const json=await response.json()
  const newNotes = notes.filter((note) => {
    return note._id !== id
  });
  setNotes(newNotes);
} 

// Edit a Note*
  const editNote = async (id, title, description, tag) =>
  {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5NjRhNDQ5MjA4NzA4Njc3NjZjYzUzIn0sImlhdCI6MTYzNzIzOTQzNX0.votUc7GGfzFlcs-gpT7wXw5l1HO56rQS_78f7oC2sfQ"
     },
      body: JSON.stringify({title, description, tag}),
    });
    const json= response.json()


  // Logic to edit in client side
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
  }


}
return (
  <noteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
    {props.children}
  </noteContext.Provider>
)
}  
export default NoteState;