import { useState } from "react";
import "./App.css";

function App() {
  // 1. STATE: data that React remembers and re-renders when it changes
  const [notes, setNotes] = useState([
    { id: 1, title: "Welcome", text: "Add, edit or delete notes here." },
  ]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null); // null = we are adding, not editing

  // 2. CREATE or UPDATE: runs when the form button is clicked
  function handleSave() {
    if (title.trim() === "" && text.trim() === "") return; // ignore empty notes

    if (editingId === null) {
      // Add a new note at the top of the list
      const newNote = { id: Date.now(), title: title, text: text };
      setNotes([newNote, ...notes]);
    } else {
      // Update the note that has the matching id
      const updatedNotes = notes.map(function (note) {
        if (note.id === editingId) {
          return { ...note, title: title, text: text };
        }
        return note; // leave other notes unchanged
      });
      setNotes(updatedNotes);
    }

    clearForm();
  }

  // 3. Fill the form with an existing note so it can be changed
  function handleEdit(note) {
    setEditingId(note.id);
    setTitle(note.title);
    setText(note.text);
  }

  // 4. DELETE: keep every note except the one with this id
  function handleDelete(id) {
    const remainingNotes = notes.filter(function (note) {
      return note.id !== id;
    });
    setNotes(remainingNotes);

    if (editingId === id) clearForm(); // stop editing a deleted note
  }

  function clearForm() {
    setTitle("");
    setText("");
    setEditingId(null);
  }

  // 5. WHAT THE USER SEES (JSX looks like HTML)
  return (
    <div className="app">
      <h1>My Notes</h1>

      <div className="form">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn primary" onClick={handleSave}>
          {editingId === null ? "Add Note" : "Update Note"}
        </button>
        {editingId !== null && (
          <button className="btn" onClick={clearForm}>
            Cancel
          </button>
        )}
      </div>

      {notes.length === 0 && <p className="empty">No notes yet.</p>}

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <button className="btn" onClick={() => handleEdit(note)}>
              Edit
            </button>
            <button className="btn danger" onClick={() => handleDelete(note.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
