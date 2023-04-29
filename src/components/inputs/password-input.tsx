import TextInput from "./text-input";
import {ChangeEvent} from "react";

type PasswordInputProps = {
  name: string;
  value: string|number;
  error: string;
  title?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput(props: PasswordInputProps) {
  return (
    <TextInput
      name={props.name}
      title={props.title}
      type="password"
      placeholder="&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;&#9913;"
      required={props.required}
      autoFocus={props.autoFocus}
      value={props.value}
      error={props.error}
      onChange={props.onChange}/>
  );
}