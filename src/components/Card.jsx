import { MdDelete } from "react-icons/md"

const Card = ({ note, deleteNote }) => {
  return (
    <div className="card">
      <span className="del" onClick={() => deleteNote(note.id)}>
        <MdDelete />
      </span>

      <div className="title">{note.title}</div>
      <div className="desc">{note.desc}</div>
    </div>
  )
}

export default Card



