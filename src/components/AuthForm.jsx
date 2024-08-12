import React from "react";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { SocialMediaButtons } from "./SocialMediaButtons";

export function AuthForm({
  isSignUpVisible,
  formData,
  handleInputChange,
  handleSubmit,
  error,
}) {
  return (
    <div className="flex flex-col items-center flex-1">
      <h1 className="mb-4 text-4xl font-bold text-primary">
        {isSignUpVisible ? "Sign Up" : "Login"}
      </h1>
      {/* <p className="mb-6 text-lg text-muted-foreground">
        {isSignUpVisible
          ? "Sign up using social networks"
          : "Login using social networks"}
      </p>
      <SocialMediaButtons />

      <div className="flex items-center w-full mb-6">
        <div className="flex-grow border-t border-muted" />
        <span className="px-4 text-sm text-muted-foreground">OR</span>
        <div className="flex-grow border-t border-muted" />
      </div> */}

      <form
        className="w-full max-w-sm space-y-4 flex-1"
        onSubmit={handleSubmit}
      >
        <FormField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <FormField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {isSignUpVisible && (
          <FormField
            type="select"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            options={[
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
              { label: "Super Admin", value: "superadmin" },
            ]}
          />
        )}
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full py-2 text-white bg-primary-dark rounded-lg"
        >
          {isSignUpVisible ? "Sign Up" : "Login"}
        </Button>
      </form>
    </div>
  );
}
