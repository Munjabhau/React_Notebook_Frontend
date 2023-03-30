import { useState, useContext } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial);

  //get all Notes
  const getNotes = async() => {
    //API call
    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    const json=await response.json();
    console.log(json);
    setNotes(json);
  };


  //Add a Note
  const addNote = async(title, description, tag) => {
    //TODO: API Call
    //API call
    const response=await fetch(`${host}/api/notes/addnote`,{
      method:'POST',
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });

    console.log("Adding a new note");
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async(id) => {
    // API Call
    const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    const json= response.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote =async (id, title, description, tag) => {
    //API call
    const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:'PUT',
      headers:{
        'content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
    const json= await response.json();

    let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
