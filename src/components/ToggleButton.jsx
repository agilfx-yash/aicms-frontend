import React from "react";
import { Button } from "./Button";

export function ToggleButton({ isSignUpVisible, setIsSignUpVisible }) {
  return (
    <div className="flex justify-center mt-4">
      <Button
        className="px-4 py-2 text-primary border-primary rounded-lg"
        onClick={() => setIsSignUpVisible(!isSignUpVisible)}
      >
        {isSignUpVisible ? "Login" : "Sign Up"}
      </Button>
    </div>
  );
}
