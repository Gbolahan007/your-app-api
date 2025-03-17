import { IoMdSearch } from "react-icons/io";

function HeaderSearch() {
  return (
    <form className="relative flex items-center">
      <input
        placeholder="Search item"
        className="w-28 rounded-lg bg-white px-4 py-2 text-sm text-green-600 transition-all duration-300 placeholder:text-green-400 focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
      <div className="absolute right-0 px-3">
        <IoMdSearch color="green" size={20} />
      </div>
    </form>
  );
}

export default HeaderSearch;
