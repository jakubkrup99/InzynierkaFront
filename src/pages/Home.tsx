import logo from "../../public/PhotoScribe-logo-transparent.png";
import Button from "../components/Button";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#151D28] text-black dark:text-white">
      <div className="text-center -translate-y-3">
        {/* <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-6" /> */}
        <h1 className="text-6xl font-semibold">PhotoScribe</h1>
        <p className=" text-xl text-gray-600 dark:text-gray-400 mt-2 mb-8">
          Describe your photos with AI
        </p>
        <div className="flex flex-col gap-3 w-56 mx-auto items-center justify-center">
          <Button color="blue">Create account</Button>
          <Button color="grey">Sign in</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
