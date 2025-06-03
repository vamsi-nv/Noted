import { Link } from "react-router";

function Navbar() {
  return (
    <header className="w-full py-8 ">
      <section className="w-[80%] sm:max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-4xl font-bold ">Noted.</h1>
        <div>
          <Link to={`/create`} className="">
            <button className="flex items-center gap-1 bg-neutral-900 text-white py-2 px-4 rounded-full font-medium hover:bg-neutral-700 cursor-pointer dark:border border-gray-400 dark:bg-neutral-200/5 transition-colors duration-150">
              <span>+</span>
              <span>New Note</span>
            </button>
          </Link>
        </div>
      </section>
    </header>
  );
}

export default Navbar;
