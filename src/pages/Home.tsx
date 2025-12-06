import { Link } from "react-router-dom";
// import logo from "../../public/PhotoScribe-logo-transparent.png";
import Button from "../components/Buttons/Button";

function HomePage() {
  return (
    <div className="text-center -translate-y-3">
      <h1 className="md:text-6xl text-4xl font-semibold">PhotoScribe</h1>
      <p className=" md:text-xl text-lg text-gray-600 dark:text-gray-400 mt-2 mb-8">
        Describe your photos with AI
      </p>
      <div className="flex flex-col gap-3 w-56 mx-auto items-center justify-center">
        <Link to="/register" className="w-72">
          <Button color="blue">Create account</Button>
        </Link>
        <Link to="/login" className="w-72">
          <Button color="gray">Sign in</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
