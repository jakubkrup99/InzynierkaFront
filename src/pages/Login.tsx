import { Form } from "react-router-dom";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Button from "../components/Button";
import { useState } from "react";
import ValidationError from "../components/ValidationError";

function LoginPage() {
  const [errors, setErrors] = useState(["Please enter your username"]);
  return (
    <div className="w-full min-h-screen flex">
      <div className="hidden md:flex md:w-1/3 items-center justify-center dark:bg-[#151D28]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-500 mb-4">Sign in</h1>
          <p className="text-gray-300 text-lg">
            Enter your username and password
          </p>
        </div>
      </div>
      <div className="text-left w-full p-3 max-w-3xl">
        <h1 className="text-xl my-3 ">Sign in</h1>
        <Form>
          <label
            htmlFor="email"
            className="flex justify-center items-center dark:bg-gray-800 dark:text-gray-300 px-3 py-3 rounded-md gap-2 cursor-text mb-2"
          >
            <CiAt size={20} />
            <input
              className="flex-1 bg-transparent outline-none"
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              required
            />
          </label>
          <label
            htmlFor="email"
            className="flex justify-center items-center dark:bg-gray-800 dark:text-gray-300 px-3 py-3 rounded-md gap-2 cursor-text"
          >
            <CiLock size={20} />
            <input
              className="flex-1 bg-transparent outline-none"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </label>
          {errors.length > 0 &&
            errors.map((err) => <ValidationError text={err} />)}
          <div className="flex my-4 justify-between">
            <Button color="gray" width={24}>
              Back
            </Button>
            <Button color="blue" width={24}>
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
