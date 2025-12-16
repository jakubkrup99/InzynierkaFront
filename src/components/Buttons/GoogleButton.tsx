import { FcGoogle } from "react-icons/fc";
import Button from "./Button";

interface GoogleButtonProps {
  buttonContent: string;
}
function GoogleButton({ buttonContent }: GoogleButtonProps) {
  function handleGoogleLogin() {
    window.location.href =
      "https://localhost:7033/api/authorization/google?returnUrl=http://localhost:5173";
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
