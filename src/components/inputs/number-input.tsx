import {ChangeEvent} from "react";
import TextInput from "./text-input.tsx";

type NumberInputProps = {
  name: string;
  placeholder: string;
  value: string|number;
  error: string;
  step: string;
  min?: string;
  max?: string;
  title?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function NumberInput(props: NumberInputProps) {
  return (
    <TextInput name={props.name}
               title={props.title}
               type="number"
               step={props.step}
               min={props.min}
               max={props.max}
               placeholder={props.placeholder}
               onChange={props.onChange}
               value={props.value}
               error={props.error} />
  );
}