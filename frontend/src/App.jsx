import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [notes, setNotes] = useState([]);

  // Function that runs once
  useEffect(() => {
    fetch("http://localhost:8080/api/notes") // Fetches GET Data from Backend
      .then(res => res.json()) //Parses the JSON response body from Backend
      .then(data => setNotes(data)); // Stores notes in state
  }, []);


  return (
  <div>
    <h1>NoteLyft</h1>
    <ul>
      {notes.map(note => ( // map each note to an <li>; key={note.id} gives React a unique id per item
        <li key={note.id}>
          <h2><strong>{note.title}</strong></h2> <p>{note.content}</p>
        </li>
      ))}
    </ul>
  </div>
);

}

export default App
