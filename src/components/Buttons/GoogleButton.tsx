import { FcGoogle } from "react-icons/fc";
import Button from "./Button";

interface GoogleButtonProps {
  buttonContent: string;
}
const apiUrl = import.meta.env.VITE_API_URL;

function GoogleButton({ buttonContent }: GoogleButtonProps) {
  function handleGoogleLogin() {
    window.location.href = `${apiUrl}/api/authorization/google?returnUrl=https://inzynierka-front-two.vercel.app`;
  }
  return (
    <div className="flex justify-end">
      <Button
        onClick={handleGoogleLogin}
        width={64}
        customStyles={"max-w-3xl flex items-center justify-between text-l"}
      >
        <FcGoogle size={24} className="mr-2" />
        {buttonContent}
      </Button>
    </div>
  );
}

export default GoogleButton;
