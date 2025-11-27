import { CiSearch } from "react-icons/ci";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isImagesPage = location.pathname === "/images";
  return (
    <nav className="fixed top-0 w-full bg-gray-100 dark:bg-blue-600 p-3 flex justify-between items-center gap-2">
      {" "}
      {!isImagesPage ? (
        <Button color="darkBlue" width={24} onClick={() => navigate("/images")}>
          Images
        </Button>
      ) : (
        <Button color="darkBlue" width={32} onClick={() => navigate("/main")}>
          Add image
        </Button>
      )}
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
      <Button color="darkBlue" width={32}>
        Log out
      </Button>
    </nav>
  );
}

export default Navbar;
