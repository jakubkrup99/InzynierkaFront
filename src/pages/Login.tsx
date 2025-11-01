import { Form } from "react-router-dom";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Button from "../components/Button";
import { useState } from "react";
import ValidationError from "../components/ValidationError";

function LoginPage() {
  const [errors, setErrors] = useState(["Please enter your username"]);
  return (
    <div className="text-left w-full p-3">
      <h1 className="text-xl my-3">Sign in</h1>
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
  );
}

export default LoginPage;
