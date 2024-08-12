import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/AuthForm";
import { ToggleButton } from "../../components/ToggleButton";
import { Button } from "../../components/Button";
import axios from "axios";
export function AuthComponent() {
  const [isSignUpVisible, setIsSignUpVisible] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
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
      const url = isSignUpVisible
        ? "https://aicms-backend-bcf49b15774f.herokuapp.com/signup"
        : "https://aicms-backend-bcf49b15774f.herokuapp.com/login";
      const { data } = await axios.post(url, formData);

      // Handle successful response (e.g., store token, redirect)
      navigate("/animation"); // Redirect to the animation page
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
          <Button onClick={() => navigate("/")} variant="default">
            Back
          </Button>
          <span className="ml-4 text-xl font-semibold text-primary">AICMS</span>
        </div>
        <AuthForm
          isSignUpVisible={isSignUpVisible}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          error={error}
        />
        <ToggleButton
          isSignUpVisible={isSignUpVisible}
          setIsSignUpVisible={setIsSignUpVisible}
        />
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
