import { CiAt, CiLock } from "react-icons/ci";
import Button from "../components/Button";
import { Form, Link } from "react-router-dom";
import { useState } from "react";
import ValidationError from "../components/ValidationError";

function RegisterPage() {
  const [errors, setErrors] = useState(["Please enter your username"]);
  return (
    <div className="w-full min-h-screen flex mx-2">
      <div className="hidden md:flex md:w-1/3 items-center justify-end dark:bg-[#151D28] p-8">
        <div className="text-right">
          <h1 className="text-6xl font-bold text-blue-500 mb-4">
            Create Account
          </h1>
          <p className="text-gray-300 text-lg">
            We're so excited to have you join us!
          </p>
        </div>
      </div>
      <div className="w-full md:w-2/3 flex items-center justify-start md:border-l-1 border-gray-600 p-8">
        <div className="text-left w-full p-3 max-w-3xl">
          <h1 className="text-xl my-3 ">Register</h1>
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
              htmlFor="password"
              className="flex justify-center items-center dark:bg-gray-800 dark:text-gray-300 px-3 py-3 rounded-md gap-2 cursor-text mb-2"
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
            <label
              htmlFor="confirm-password"
              className="flex justify-center items-center dark:bg-gray-800 dark:text-gray-300 px-3 py-3 rounded-md gap-2 cursor-text"
            >
              <CiLock size={20} />
              <input
                className="flex-1 bg-transparent outline-none"
                id="confirm-password"
                type="confirm-password"
                name="confirm-password"
                placeholder="Confirm password"
                required
              />
            </label>
            {/* {errors.length > 0 &&
              errors.map((err) => <ValidationError text={err} />)} */}
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
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
