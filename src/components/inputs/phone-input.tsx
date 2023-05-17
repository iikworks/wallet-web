import {ChangeEvent, useRef} from "react";
import {IMaskInput} from "react-imask";

interface PhoneInputProps {
  name: string;
  value: string;
  error: string;
  title?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PhoneInput(props: PhoneInputProps) {
  const ref = useRef(null);
  const inputRef = useRef(null);

  return (
    <div>
      {props.title &&<label htmlFor={props.name} className="ml-2.5">{props.title}</label>}
      <IMaskInput
        mask="+375 00 0000000"
        type="text"
        name={props.name}
        id={props.name}
        className="mt-1 py-1.5 px-2.5 block rounded-lg text-sm border-none focus:ring-0 bg-gray-200 focus:bg-gray-300 w-full"
        ref={ref}
        inputRef={inputRef}
        placeholder='+375 00 0000000'
        required={props.required}
        autoFocus={props.autoFocus}
        onInput={props.onChange}
        value={props.value}
      />
      {props.error !== '' &&<div className="font-medium text-red-500 text-xs ml-3 mt-0.5">
        {props.error}
      </div>}
    </div>
  );
}