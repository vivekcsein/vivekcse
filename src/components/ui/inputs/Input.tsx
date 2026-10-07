import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const generatedId = React.useId(); // ✅ always called
    const inputId = id ?? generatedId; // ✅ safe fallback

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`input relative ${error ? "input-error" : ""} ${className}`}
          {...props}
        />

        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
