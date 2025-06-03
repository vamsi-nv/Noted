import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2 } from "lucide-react";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";

function Note({ note, setNotes }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Deleting note with ID:", id);

    if (!window.confirm("Are you sure you want to delete the note?")) return;

    try {
      const response = await axios.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.filter((note) => note._id !== id);
        console.log("Updated notes:", updatedNotes);
        return updatedNotes;
      });
    } catch (error) {
      console.error(
        "Error deleting note:",
        error.response?.data || error.message
      );
      toast.error("Error deleting note");
    }
  };

  return (
    <div className="w-[90%] mx-auto sm:w-3/3">
      <Link to={`/note/${note._id}`}>
        <div className="border min-w-full border-gray-300 rounded-xl hover:dark:-translate-y-1 hover:shadow-xl bg-gray-50 hover:bg-white transition-all duration-200 flex flex-col gap-3 items-start p-5 dark:bg-neutral-900 dark:border-neutral-500 hover:dark:bg-neutral-900">
          <h3 className="text-xl font-semibold">{note.title}</h3>
          <p className="text-gray-700 dark:text-gray-400">{note.content}</p>
          <div className="flex items-center justify-between w-full mt-4">
            <span className="text-sm text-gray-500">
              {formatDate(note.createdAt)}
            </span>
            <div className="flex items-center space-x-3">
              <PenSquareIcon className="size-4 hover:dark:text-white text-gray-500 hover:text-gray-700" />
              <button onClick={(e) => handleDelete(e, note._id)}>
                <Trash2 className="text-red-400 size-4 cursor-pointer hover:text-red-600 hover:dark:text-red-500"/>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Note;
