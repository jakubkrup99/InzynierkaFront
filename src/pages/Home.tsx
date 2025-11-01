import { Link } from "react-router-dom";
import logo from "../../public/PhotoScribe-logo-transparent.png";
import Button from "../components/Button";

function HomePage() {
  return (
    <div className="text-center -translate-y-3">
      {/* <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-6" /> */}
      <h1 className="text-6xl font-semibold">PhotoScribe</h1>
      <p className=" text-xl text-gray-600 dark:text-gray-400 mt-2 mb-8">
        Describe your photos with AI
      </p>
      <div className="flex flex-col gap-3 w-56 mx-auto items-center justify-center">
        <Button color="blue">Create account</Button>
        <Link to="/login">
          <Button color="gray">Sign in</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
