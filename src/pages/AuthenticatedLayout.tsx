import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SearchProvider } from "../context/SearchContext";

function AuthenticatedLayout() {
  return (
    <>
      <SearchProvider>
        <Navbar />
        <Outlet />
      </SearchProvider>
    </>
  );
}

export default AuthenticatedLayout;
