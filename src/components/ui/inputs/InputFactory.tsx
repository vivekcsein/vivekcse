import "@/styles/ui/input.css";
import "@/styles/ui/input-autofill.css";
import type { Control, UseFormRegister } from "react-hook-form";
import Checkbox from "@/components/ui/inputs/Checkbox";
import Select from "@/components/ui/inputs/Select";
import type { InputType } from "@/types/app";
import Input from "./Input";
import InputDate from "./InputDate";
import InputPassword from "./InputPassword";
import InputPhone from "./InputPhone";

export interface InputFactoryProps {
  id: string;
  type: InputType;
  label: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
  options?: { label: string; value: string }[];
  // typed as unknown so callers don't need generics; cast internally
  register: UseFormRegister<Record<string, unknown>>;
  control: Control<Record<string, unknown>>;
  error?: { message: string };
}

// ─── Factory ──────────────────────────────────────────────────────────────────
const InputFactory: Record<
  string,
  (props: InputFactoryProps) => React.ReactNode
> = {
  text: (props: InputFactoryProps) => (
    <Input
      id={props.id}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      error={props.error?.message}
      {...props.register(props.id)}
    />
  ),

  email: (props: InputFactoryProps) => (
    <Input
      type="email"
      id={props.id}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete ?? "email"}
      error={props.error?.message}
      {...props.register(props.id)}
    />
  ),

  password: (props: InputFactoryProps) => (
    <InputPassword
      id={props.id}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      error={props.error?.message}
      {...props.register(props.id)}
    />
  ),

  tel: (props: InputFactoryProps) => (
    <InputPhone
      id={props.id}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      error={props.error?.message}
      {...props.register(props.id)}
    />
  ),

  date: (props: InputFactoryProps) => (
    <InputDate
      id={props.id}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      error={props.error?.message}
      {...props.register(props.id)}
    />
  ),

  checkbox: (props: InputFactoryProps) => (
    <Checkbox
      id={props.id}
      label={props.label}
      error={props.error?.message}
      {...props.register(props.id)}
    />
  ),

  select: (props: InputFactoryProps) => (
    <Select
      id={props.id}
      label={props.label}
      options={props.options ?? []}
      required={props.required}
      register={props.register}
      errorMessage={props.error?.message}
    />
  ),
};

export default InputFactory;
