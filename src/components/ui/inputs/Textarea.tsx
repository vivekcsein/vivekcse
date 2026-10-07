import React from "react";
import { cn } from "@/packages/utils/cn";

/**
 * Mirrors Input.tsx's structure exactly — extends the native `<textarea>`
 * attributes so register()'s returned { name, onChange, onBlur, ref }
 * spreads straight on, same label/error/required conventions.
 */
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, required, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const errorId = `${textareaId}-error`;

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={textareaId} className="input-label">
            {label}
            {required && (
              <span className="input-required" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          required={required}
          className={cn("textarea", error && "input-error", className)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />

        {error && (
          <span id={errorId} role="alert" className="input-error-text">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
