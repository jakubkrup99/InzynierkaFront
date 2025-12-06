import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SearchProvider } from "../context/SearchContext";
import { AuthProvider } from "../context/AuthContext";

function AuthenticatedLayout() {
  return (
    <>
      <SearchProvider>
        <AuthProvider>
          <Navbar />
          <Outlet />
        </AuthProvider>
      </SearchProvider>
    </>
  );
}

export default AuthenticatedLayout;
