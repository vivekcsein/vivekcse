"use client";
import type { Path, UseFormRegister } from "react-hook-form";

interface SelectProps<T extends Record<string, unknown>> {
  id: string;
  label?: string;
  options: { label: string; value: string }[];
  required?: boolean;
  register: UseFormRegister<T>;
  errorMessage?: string;
}

const Select = <T extends Record<string, unknown>>({
  id,
  options,
  required = false,
  register,
  errorMessage,
}: SelectProps<T>) => {
  // No internal <label> here — FormFields (AuthForm.tsx) already renders
  // the field label for every non-checkbox input type, keyed to this
  // `id` via htmlFor. A second label here would render twice.
  return (
    <div className="select-wrapper">
      <select
        id={id}
        {...register(id as Path<T>)}
        required={required}
        className={`select-input ${errorMessage ? "select-error" : ""}`}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {errorMessage && (
        <span id={`${id}-error`} className="select-error-message">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Select;
