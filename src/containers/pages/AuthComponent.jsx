import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function AuthComponent() {
  const [isSignUpVisible, setIsSignUpVisible] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isSignUpVisible ? "/api/signup" : "/api/login";
      const { data } = await axios.post(url, formData);

      // Handle successful response (e.g., store token, redirect)
      navigate("/"); // Redirect to the dashboard or another page
      console.log("Success:", data);
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <div className="flex flex-col w-full md:w-1/2 p-8">
        <div className="flex items-center mb-8">
          {/* <img
            src="/placeholder.svg"
            alt="Logo"
            className="w-10 h-10"
            width="40"
            height="40"
            style={{ aspectRatio: "40/40", objectFit: "cover" }}
          /> */}
          <Button onClick={() => navigate("/")} variant="default">
            Back
          </Button>

          <span className="ml-4 text-xl font-semibold text-primary">AICMS</span>
        </div>
        {isSignUpVisible ? (
          <div className="flex flex-col items-center flex-1">
            <h1 className="mb-4 text-4xl font-bold text-primary">Sign Up</h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Sign up using social networks
            </p>
            <div className="flex space-x-4 mb-6">
              <button className="w-12 h-12 rounded-full border">
                <FacebookIcon className="w-6 h-6 text-blue-600" />
              </button>
              <button className="w-12 h-12 rounded-full border">
                <ChromeIcon className="w-6 h-6 text-red-600" />
              </button>
              <button className="w-12 h-12 rounded-full border">
                <LinkedinIcon className="w-6 h-6 text-blue-800" />
              </button>
            </div>
            <div className="flex items-center w-full mb-6">
              <div className="flex-grow border-t border-muted" />
              <span className="px-4 text-sm text-muted-foreground">OR</span>
              <div className="flex-grow border-t border-muted" />
            </div>
            <form
              className="w-full max-w-sm space-y-4 flex-1"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-10 py-2 rounded-lg bg-muted"
                />
              </div>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-10 py-2 rounded-lg bg-muted"
                />
              </div>
              <div className="relative">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-10 py-2 rounded-lg bg-muted"
                />
                <EyeIcon className="absolute right-4 top-2.5 w-6 h-6 text-muted-foreground" />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full py-2 text-white bg-primary-dark rounded-lg"
              >
                Sign Up
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center flex-1">
            <h1 className="mb-4 text-4xl font-bold text-primary">Login</h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Login using social networks
            </p>
            <div className="flex space-x-4 mb-6">
              <button className="w-12 h-12 rounded-full border">
                <FacebookIcon className="w-6 h-6 text-blue-600" />
              </button>
              <button className="w-12 h-12 rounded-full border">
                <ChromeIcon className="w-6 h-6 text-red-600" />
              </button>
              <button className="w-12 h-12 rounded-full border">
                <LinkedinIcon className="w-6 h-6 text-blue-800" />
              </button>
            </div>
            <div className="flex items-center w-full mb-6">
              <div className="flex-grow border-t border-muted" />
              <span className="px-4 text-sm text-muted-foreground">OR</span>
              <div className="flex-grow border-t border-muted" />
            </div>
            <form
              className="w-full max-w-sm space-y-4 flex-1"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-10 py-2 rounded-lg bg-muted"
                />
              </div>
              <div className="relative">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-10 py-2 rounded-lg bg-muted"
                />
                <EyeIcon className="absolute right-4 top-2.5 w-6 h-6 text-muted-foreground" />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full py-2 text-white bg-primary rounded-lg"
              >
                Login
              </Button>
            </form>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <Button
            className="px-4 py-2 text-primary border-primary rounded-lg"
            onClick={() => setIsSignUpVisible(!isSignUpVisible)}
          >
            {isSignUpVisible ? "Login" : "Sign Up"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 bg-gradient-to-r from-primary to-secondary">
        <div className="flex flex-col items-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            {isSignUpVisible
              ? "Already have an account?"
              : "Don't have an account?"}
          </h2>
          <p className="mb-6 text-lg text-center">
            {isSignUpVisible
              ? "Login and start exploring new opportunities!"
              : "Sign up and start exploring new opportunities!"}
          </p>
          <Button
            className="px-8 py-2 text-primary-light bg-primary-dark rounded-lg"
            onClick={() => setIsSignUpVisible(!isSignUpVisible)}
          >
            {isSignUpVisible ? "Log In" : "Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-6a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
