import { useEffect } from "react";
import ImageForm from "../components/ImageForm";
import { useAuth } from "../context/AuthContext";
import { setLogoutCallback } from "../client/authorization";

function MainPage() {
  const { logout } = useAuth();

  useEffect(() => {
    setLogoutCallback(logout);
  }, [logout]);
  return (
    <div className="w-full min-h-screen flex mx-2 items-center justify-center">
      <ImageForm />
    </div>
  );
}

export default MainPage;
