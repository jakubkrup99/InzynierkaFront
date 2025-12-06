import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "./Buttons/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchPhrase } from "../context/SearchContext";
import { logout } from "../client/authorization";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchPhrase, setSearchPhrase } = useSearchPhrase();
  const isImagesPage = location.pathname === "/images";

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-gray-100 dark:bg-blue-600 p-3 flex justify-between items-center gap-2">
      <div className="hidden md:flex gap-2">
        {!isImagesPage ? (
          <Button
            color="darkBlue"
            width={64}
            onClick={() => navigate("/images")}
          >
            Your images
          </Button>
        ) : (
          <Button color="darkBlue" width={32} onClick={() => navigate("/main")}>
            Add image
          </Button>
        )}
      </div>

      <div className="md:hidden">
        <GiHamburgerMenu
          size={28}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {isImagesPage && (
        <div className="relative bg-gray-300 dark:bg-gray-800 rounded-lg grow-2 max-w-80">
          <CiSearch
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-gray-500 w-5 h-5 pointer-events-none"
          />
          <input
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full border rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none dark:placeholder:text-gray-200 placeholder:text-black"
          />
        </div>
      )}

      <div className="hidden md:flex">
        <Button color="darkBlue" width={32} onClick={handleLogout}>
          Log out
        </Button>
      </div>

      {open && (
        <div className="absolute top-14 left-0 w-full bg-gray-100 dark:bg-gray-800 p-4 flex flex-col gap-3 md:hidden shadow-lg">
          {!isImagesPage ? (
            <Button
              color="darkBlue"
              width={96}
              onClick={() => navigate("/images")}
            >
              Your images
            </Button>
          ) : (
            <Button
              color="darkBlue"
              width={96}
              onClick={() => navigate("/main")}
            >
              Add image
            </Button>
          )}

          <Button color="darkBlue" width={96} onClick={logout}>
            Log out
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
