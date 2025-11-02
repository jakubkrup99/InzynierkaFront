import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main className="bg-white dark:bg-midnight text-black dark:text-white flex min-h-screen  items-center justify-center w-full ">
      {/* <nav>Main navigation</nav> */}
      <Outlet />
    </main>
  );
}

export default RootLayout;
