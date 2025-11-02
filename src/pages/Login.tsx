import { Form, Link } from "react-router-dom";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Button from "../components/Button";
import { useState } from "react";
import ValidationError from "../components/ValidationError";
import Input from "../components/Input";

function LoginPage() {
  const [errors, setErrors] = useState(["Please enter your username"]);
  return (
    <div className="w-full min-h-screen flex mx-2">
      <div className="hidden md:flex md:w-1/3 items-center justify-end bg-gray-100 dark:bg-midnight p-8">
        <div className="text-right">
          <h1 className="text-6xl font-bold text-blue-500 mb-4">Sign in</h1>
          <p className="text-black dark:text-gray-300 text-lg">
            Enter your username and password
          </p>
        </div>
      </div>
      <div className="w-full md:w-2/3 flex items-center justify-start md:border-l-1 border-gray-600 p-8">
        <div className="text-left w-full p-3 max-w-3xl">
          <h1 className="text-xl my-3 ">Sign in</h1>
          <form>
            <Input Icon={CiAt} name="email" placeholder="Email Address" />
            <Input Icon={CiLock} name="password" placeholder="Password" />
            {errors.length > 0 &&
              errors.map((err) => <ValidationError key={err} text={err} />)}
            <div className="flex my-4 justify-between">
              <Link to="/">
                <Button color="gray" width={24}>
                  Back
                </Button>
              </Link>
              <Button color="blue" width={24}>
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
