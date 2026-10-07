"use client";
import React, { useState } from "react";
import EyeClose from "../svg/EyeClose";
import EyeOpen from "../svg/EyeOpen";

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const [show, setShow] = useState(false);

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}

        <div className="input-field">
          <input
            ref={ref}
            id={inputId}
            type={show ? "text" : "password"}
            className={`input with-icon-right ${error ? "input-error" : ""} ${className}`}
            {...props}
          />

          <button
            type="button"
            className="input-icon-btn"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
          >
            {show ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>

        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  },
);
InputPassword.displayName = "InputPassword";

export default InputPassword;
