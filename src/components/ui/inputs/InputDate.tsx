import React from "react";

interface InputDateProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

const InputDate = React.forwardRef<HTMLInputElement, InputDateProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

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
          type="date"
          className={`input input-date relative ${error ? "input-error" : ""} ${className}`}
          {...props}
        />

        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  },
);

InputDate.displayName = "InputDate";

export default InputDate;
