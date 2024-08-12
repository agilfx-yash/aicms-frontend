import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export function PasswordField({ name, value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-4 pr-10 py-2 rounded-lg bg-muted"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center px-3"
        onClick={() => setShowPassword(!showPassword)}
      >
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="w-5 h-5 text-muted-foreground"
        />
      </button>
    </div>
  );
}
