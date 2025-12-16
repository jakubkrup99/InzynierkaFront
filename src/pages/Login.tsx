import { Link, useNavigate } from "react-router-dom";
import { CiAt } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import Button from "../components/Buttons/Button";
import { useState } from "react";
import ValidationError from "../components/ValidationError";
import Input from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import type LoginRequest from "../types/API/LoginRequest";
import { loginUser } from "../client/authorization";
import { FcGoogle } from "react-icons/fc";
import GoogleButton from "../components/Buttons/GoogleButton";

function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (registerData: LoginRequest) => loginUser(registerData),
    onError: (err: any) => setError(err.message),
  });
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginData = {
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };
    await mutation.mutateAsync(loginData);
    navigate("/main");
  }

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
            {error && <ValidationError text={error} />}
            <div className="flex my-4 justify-between">
              <Link to="/">
                <Button type="button" color="gray" width={24}>
                  Back
                </Button>
              </Link>
              <Button color="blue" width={24} disabled={mutation.isPending}>
                {mutation.isPending ? "Submiting..." : "Log in"}
              </Button>
            </div>
          </form>
          <GoogleButton buttonContent="Login with google" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
