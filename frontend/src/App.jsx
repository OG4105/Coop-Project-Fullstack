import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [notes, setNotes] = useState([]);

  // Function that reloads fetch from Backend
  const fetchNotes = () => {
  fetch("http://localhost:8080/api/notes")
    .then(res => res.json())
    .then(data => setNotes(data));
  };

  useEffect(() => { fetchNotes(); }, []); // Use effect for fetching notes

  const [title, setTitle] = useState(""); // Use state (Title)
  const [content, setContent] = useState(""); // Use state (Content)

  // Function ADD handler
  const handleAdd = () => {
    fetch("http://localhost:8080/api/notes", { //Fetches from site notes
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    })
      .then(() => { fetchNotes(); setTitle(""); setContent(""); }); //Fetches title and content
  };

  // Function DELETE handler
  const handleDelete = (id) => { // Search based on ID
    fetch(`http://localhost:8080/api/notes/${id}`, { method: "DELETE" })
      .then(() => fetchNotes());
  };


  return (
  <div>

    <h1>NoteLyft</h1>

      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <button onClick={handleAdd}>Add note</button>

    <ul>
      {notes.map(note => ( // map each note to an <li>; key={note.id} gives React a unique id per item
        <li key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <button onClick={() => handleDelete(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

}

export default App
