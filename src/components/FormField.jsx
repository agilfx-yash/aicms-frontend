import React from "react";
import { Input } from "./Input";
import { PasswordField } from "./PasswordField";

export function FormField({
  type,
  name,
  placeholder,
  value,
  onChange,
  options,
}) {
  if (type === "select") {
    return (
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-4 pr-10 py-2 rounded-lg bg-muted"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "password") {
    return (
      <PasswordField
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }

  return (
    <div className="relative">
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-4 pr-10 py-2 rounded-lg bg-muted"
      />
    </div>
  );
}
