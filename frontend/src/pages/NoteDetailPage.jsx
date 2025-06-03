import { ArrowLeft, Trash2Icon } from "lucide-react";
import axios from "../utils/axios.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";

function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get("/notes/" + id);
        setNote(response.data.data.note);
      } catch (error) {
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete("/notes/" + id);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete the note");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put("/notes/" + id, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
    } catch (error) {
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!note) {
    return <p className="text-center mt-20 text-gray-600">Note not found.</p>;
  }

  return (
    <>
      <div className="top-0 w-full max-w-[90%] py-6 flex items-center justify-between sm:max-w-4xl mx-auto">
        <Link
          to="/"
          className="flex items-center dark:text-neutral-400 hover:dark:text-neutral-200 text-gray-600 hover:text-black gap-1"
        >
          <ArrowLeft className="size-5" />
          <p>Back to notes</p>
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 cursor-pointer text-red-400 border border-red-400 text-base hover:text-red-600 hover:bg-red-200 p-2 rounded-full"
        >
          <Trash2Icon className="size-5" />
          <p>Delete note</p>
        </button>
      </div>

      <div className="min-h-[80vh]  flex items-center justify-center">
        <form
          onSubmit={handleUpdate}
          className="bg-white dark:bg-neutral-900 w-full mx-8 md:w-3/5 lg:w-1/2 max-w-4xl flex flex-col gap-10 h-full shadow-lg border dark:border-neutral-700 border-gray-300 rounded-lg p-10"
        >
          <h2 className="text-2xl font-semibold dark:text-gray-100">Edit note</h2>

          <div>
            <label className="flex flex-col ">
              <span className="text-lg dark:text-neutral-500">Title</span>
              <input
                required
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                className="w-full p-4 dark:border-neutral-700 dark:bg-neutral-950/8 rounded border dark:placeholder:text-neutral-700 border-gray-400"
                type="text"
                placeholder="Note Title"
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              <span className="text-lg dark:text-neutral-500">Content</span>
              <textarea
                required
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                className="w-full h-52 p-4 dark:placeholder:text-neutral-700 focus:outline-neutral-500  rounded border dark:bg-neutral-950/8 dark:border-neutral-700  border-gray-400"
                placeholder="Note Content"
              ></textarea>
            </label>
          </div>

          <button
            type="submit"
            disabled={saving || !note.title.trim() || !note.content.trim()}
            className={`bg-black text-white dark:bg-gray-100 dark:text-black p-3 rounded cursor-pointer ${
              saving ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            {saving ? "Saving..." : "Update Note"}
          </button>
        </form>
      </div>
    </>
  );
}

export default NoteDetailPage;
