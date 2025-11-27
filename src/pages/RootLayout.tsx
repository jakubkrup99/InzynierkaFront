import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main className="bg-white dark:bg-midnight text-black dark:text-white flex min-h-screen  items-center justify-center w-full ">
      <div>
        <Toaster position="bottom-right" />
      </div>
      <Outlet />
    </main>
  );
}

export default RootLayout;
