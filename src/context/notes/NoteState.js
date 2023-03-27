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
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDY2MDg2OWQ5NzQyYTM5Mzk1OTM1In0sImlhdCI6MTY3OTY2OTAyMH0.teKR9J3-WzrcEdYJ4HFMY6ItzAGkPlh54N0Xz9mZH9o'
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
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDY2MDg2OWQ5NzQyYTM5Mzk1OTM1In0sImlhdCI6MTY3OTY2OTAyMH0.teKR9J3-WzrcEdYJ4HFMY6ItzAGkPlh54N0Xz9mZH9o'
      },
      body:JSON.stringify({title,description,tag})
    });

    console.log("Adding a new note");
    const note = {
      _id: "641ec0e81da7cc06fa4f47eabc",
      user: "641d660869d9742a39395935",
      title: title,
      description: description,
      tag: tag,
      date: "2023-03-25T09:37:44.063Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async(id) => {
    // API Call
    const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        'content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDY2MDg2OWQ5NzQyYTM5Mzk1OTM1In0sImlhdCI6MTY3OTY2OTAyMH0.teKR9J3-WzrcEdYJ4HFMY6ItzAGkPlh54N0Xz9mZH9o'
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
      method:'POST',
      headers:{
        'content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxZDY2MDg2OWQ5NzQyYTM5Mzk1OTM1In0sImlhdCI6MTY3OTY2OTAyMH0.teKR9J3-WzrcEdYJ4HFMY6ItzAGkPlh54N0Xz9mZH9o'
      },
      body:JSON.stringify({title,description,tag})
    });
    const json= response.json();
    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
