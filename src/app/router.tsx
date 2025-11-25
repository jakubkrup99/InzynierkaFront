import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import MainPage from "../pages/Main";
import AuthenticatedLayout from "../pages/AuthenticatedLayout";
import ImagesPage from "../pages/ImagesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "main",
        element: <AuthenticatedLayout />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
        ],
      },
      {
        path: "images",
        element: <AuthenticatedLayout />,
        children: [
          {
            index: true,
            element: <ImagesPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
