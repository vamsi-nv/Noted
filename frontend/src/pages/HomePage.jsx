import { useEffect, useState } from "react";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Note from "../components/Note.jsx";
import Loader from "../components/Loader.jsx";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/notes");
        const { notes } = response.data.data;
        console.log("Fetched notes:", notes);
        setNotes(notes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to load notes");
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // useEffect(() => {
  //   console.log("Notes state updated:", notes);
  // }, [notes]);

  return (
    <div>
      <Navbar />
      <div
        className={`max-w-6xl mx-auto ${
          loading || notes.length === 0
            ? "flex justify-center items-center min-h-[80vh]"
            : "h-[80vh]"
        }`}
      >
        {loading ? (
          <Loader />
        ) : notes.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-6">
            {notes.map((note) => (
              <Note note={note} key={note._id} setNotes={setNotes} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No notes yet.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;