import './App.css'
import Navbar from "./components/Navbar"
import { useEffect, useState } from 'react'
import Card from "./components/Card"

function App() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState({ title: "", desc: "" })
  const [search, setSearch] = useState("")

  useEffect(() => {
    const localNotes = localStorage.getItem("notes")
    if (localNotes) {
      setNotes(JSON.parse(localNotes))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newNote = {
      id: Date.now(),
      title: currentNote.title,
      desc: currentNote.desc
    }

    const updated = [...notes, newNote]
    setNotes(updated)
    localStorage.setItem("notes", JSON.stringify(updated))
    setCurrentNote({ title: "", desc: "" })
  }

  const deleteNote = (id) => {
    const updated = notes.filter(note => note.id !== id)
    setNotes(updated)
    localStorage.setItem("notes", JSON.stringify(updated))
  }

  const handleChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value })
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Navbar />

      <main>
        <h1>Create your note</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={currentNote.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="desc"
              value={currentNote.desc}
              onChange={handleChange}
            />
          </div>

          <button disabled={!currentNote.title || !currentNote.desc}>
            Add Note
          </button>
        </form>
      </main>

      <section className="noteSection">
        <h2>Your Notes</h2>

        <input
          className="search"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="container">
          {filteredNotes.map(note => (
            <Card
              key={note.id}
              note={note}
              deleteNote={deleteNote}
            />
          ))}

          {filteredNotes.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">📝</span>
              <p>No notes yet</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default App

