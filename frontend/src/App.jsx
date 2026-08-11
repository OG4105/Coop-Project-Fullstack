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
  const [editingId, setEditingId] = useState(null); // Editing state

  // Function UPDATE handler
  const handleUpdate = () => {
    if (!title.trim()) return;   // don't submit without a title
    fetch(`http://localhost:8080/api/notes/${editingId}`, { // fetch based on editing id
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    })
      .then(() => {
        fetchNotes();
        setEditingId(null);   // back to "create" mode
        setTitle("");
        setContent("");
      });
  };

  // Function ADD handler
  const handleAdd = () => {
    if (!title.trim()) return;   // don't submit without a title
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

  // Function EDIT handler
  const handleEdit = (note) => { // Search based on note
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

return (
  <div className="app">
    <title>NoteLyft</title>
    <h1>NoteLyft</h1>

    <h3>Your Note:</h3>
    <div className="note-form">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <div className="form-buttons">
        <button onClick={editingId ? handleUpdate : handleAdd}>
          {editingId ? "Update note" : "Add note"}
        </button>
        {editingId && (
          <button onClick={() => { setEditingId(null); setTitle(""); setContent(""); }}>
            Cancel
          </button>
        )}
      </div>
    </div>

    <ul className="notes-list">
      {notes.map(note => (
        <li className="note-card" key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <div className="note-buttons">
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

}

export default App
