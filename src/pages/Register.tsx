import { CiAt, CiLock } from "react-icons/ci";
import Button from "../components/Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ValidationError from "../components/ValidationError";
import { validateEmail } from "../Utils/validationUtil";
import Input from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../client/authorization";
import type RegisterRequest from "../types/API/RegisterRequest";
import toast from "react-hot-toast";
import GoogleButton from "../components/Buttons/GoogleButton";

function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (registerData: RegisterRequest) => registerUser(registerData),
    onError: (err: any) => {
      toast.error("Account creation failed.");
      setError(err.message);
    },
    onSuccess: () => {
      toast.success("Your account has been created.");
      navigate("/");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const registerData = {
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
    };
    const validateEmailResult = validateEmail(registerData.email?.toString());
    if (!validateEmailResult.isValid) {
      setError(validateEmailResult.message);
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    mutation.mutate({
      email: registerData.email!.toString(),
      password: registerData.password!.toString(),
    });

    setError(null);
  }
  return (
    <div className="w-full min-h-screen flex">
      <div className="hidden md:flex md:w-1/3 items-center justify-end bg-gray-100 dark:bg-midnight p-8">
        <div className="text-right">
          <h1 className="sm:text-4xl text-6xl font-bold text-blue-500 mb-4">
            Create Account
          </h1>
          <p className="text-black dark:text-gray-300 text-lg">
            We're so excited to have you join us!
          </p>
        </div>
      </div>
      <div className="w-full md:w-2/3 flex items-center justify-start md:border-l-1 border-gray-600 p-8">
        <div className="text-left w-full p-3 max-w-3xl">
          <h1 className="text-xl my-3 ">Register</h1>
          <form onSubmit={handleSubmit}>
            <Input
              Icon={CiAt}
              name="email"
              placeholder="Email Address"
              type="email"
            />
            <Input
              Icon={CiLock}
              name="password"
              placeholder="Password"
              type="password"
            />
            <Input
              Icon={CiLock}
              name="confirm-password"
              placeholder="Confirm password"
              type="password"
            />
            {error && <ValidationError text={error} />}
            <div className="flex my-4 justify-between">
              <Link to="/">
                <Button type="button" color="gray" width={24}>
                  Back
                </Button>
              </Link>
              <Button color="blue" width={24} disabled={mutation.isPending}>
                {mutation.isPending ? "Submitting..." : "Register"}
              </Button>
            </div>
          </form>
          <GoogleButton buttonContent="Register with google" />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
