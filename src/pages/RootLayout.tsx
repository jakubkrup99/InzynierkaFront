import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main>
      {/* <nav>Main navigation</nav> */}
      <Outlet />
    </main>
  );
}

export default RootLayout;
