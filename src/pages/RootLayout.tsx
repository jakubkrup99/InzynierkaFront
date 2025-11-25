import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <main className="bg-white dark:bg-midnight text-black dark:text-white flex min-h-screen  items-center justify-center w-full ">
      <Outlet />
    </main>
  );
}

export default RootLayout;
