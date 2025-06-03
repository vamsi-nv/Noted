import axios from "../utils/axios.js";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to create note! Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="top-0 w-full max-w-[90%] py-8 flex items-center justify-between sm:max-w-4xl mx-auto">
        <Link
          to="/"
          className="flex items-center dark:text-neutral-400 hover:dark:text-neutral-200 text-gray-600 hover:text-black gap-1"
        >
          <ArrowLeft className="size-5" />
          <p>Back to notes</p>
        </Link>
      </div>
      <div className="min-h-[80vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-neutral-900 w-full mx-8 md:w-3/5 lg:w-1/2 max-w-4xl flex flex-col gap-10 h-full shadow-lg border dark:border-neutral-700 border-gray-300 rounded-lg p-10"
        >
          <h2 className="text-2xl font-semibold dark:text-gray-100">Create note</h2>
          <div>
            <label className="flex flex-col ">
              <span className="text-lg dark:text-neutral-500">Title</span>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-52 p-4 dark:placeholder:text-neutral-700 focus:outline-neutral-500  rounded border dark:bg-neutral-950/8 dark:border-neutral-700  border-gray-400"
                type="text"
                placeholder="Note Content"
              ></textarea>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !title.trim() || !content.trim()}
            className="justify-end bg-black dark:bg-gray-100 dark:text-black text-white p-3 rounded cursor-pointer"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePage;
