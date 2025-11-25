import { CiSearch } from "react-icons/ci";
import Button from "./Button";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-100 dark:bg-blue-600 p-3 flex justify-between items-center gap-2">
      {" "}
      {/* <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 dark:text-gray-300 p-1 rounded-s-sm gap-2 cursor-text mb-2">
        <CiSearch size={20} className="ml-2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full  rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
        />
      </div> */}
      <div>just logo</div>
      <div className="relative bg-gray-300 dark:bg-gray-800 rounded-lg grow-2 max-w-80">
        <CiSearch
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-gray-500 w-5 h-5 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full border rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none bg-transparen dark:placeholder:text-gray-200 placeholder:text-black"
        />
      </div>
      <Button color="darkBlue" width={24}>
        Log out
      </Button>
    </nav>
  );
}

export default Navbar;
