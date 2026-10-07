import React from "react";

interface InputPhoneProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

/**
 * Phone number input. Deliberately does NOT do any live formatting/
 * masking — that's a product decision (which country format? which
 * separator?) that belongs in a follow-up, not something to guess at
 * here. Validation itself lives in `phoneRules`
 * (packages/configs/schema.config.ts), which already accepts the
 * international `+countrycode...` format this input's `inputMode`
 * and `pattern` nudge users toward.
 */
const InputPhone = React.forwardRef<HTMLInputElement, InputPhoneProps>(
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
          type="tel"
          inputMode="tel"
          autoComplete={props.autoComplete ?? "tel"}
          pattern="^\+?[1-9]\d{7,14}$"
          className={`input relative ${error ? "input-error" : ""} ${className}`}
          {...props}
        />

        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  },
);

InputPhone.displayName = "InputPhone";

export default InputPhone;
