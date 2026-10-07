import React from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const errorShow = !!error?.length;

    return (
      <div className="checkbox-wrapper">
        <label htmlFor={inputId} className="cursor-pointer">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="checkbox-input"
            {...props}
          />

          <div className="checkbox-box">
            <svg
              viewBox="0 0 24 24"
              className="checkbox-check"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </label>

        {(label || error) && (
          <span
            className={
              errorShow ? "text-destructive text-sm" : "checkbox-label text-sm"
            }
          >
            {errorShow ? error : label}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
