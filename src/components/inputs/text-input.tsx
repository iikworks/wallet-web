import {ChangeEvent} from "react";

type TextInputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string|number;
  error: string;
  step?: string;
  min?: string;
  max?: string;
  title?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: TextInputProps) {
  return (
    <div>
      {props.title &&<label htmlFor={props.name} className="ml-2.5 font-medium">{props.title}</label>}
      <input type={props.type}
             id={props.name}
             className="mt-1 py-1.5 px-2.5 block rounded-lg border-none focus:ring-2 focus:ring-blue-400 bg-gray-100 placeholder-gray-400 font-medium  w-full"
             name={props.name}
             placeholder={props.placeholder}
             required={props.required}
             onChange={props.onChange}
             step={props.step}
             min={props.min}
             max={props.max}
             value={props.value}
             autoFocus={props.autoFocus}/>
      {props.error !== '' &&<div className="font-medium text-red-500 text-xs ml-3 mt-1">
        {props.error}
      </div>}
    </div>
  );
}