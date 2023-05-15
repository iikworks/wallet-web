import {IMaskInput} from "react-imask";
import {ChangeEvent, useRef} from "react";

type CardNumberInputProps = {
  name: string;
  value: string;
  error: string;
  placeholder?: string;
  title?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function CardNumberInput(props: CardNumberInputProps) {
  const ref = useRef(null);
  const inputRef = useRef(null);

  return (
    <div>
      {props.title &&<label htmlFor={props.name} className="ml-2.5">{props.title}</label>}
      <IMaskInput
        mask="0000 0000 0000 0000"
        type="text"
        name={props.name}
        id={props.name}
        className="mt-1 py-1.5 px-2.5 block rounded-lg text-sm border-transparent bg-gray-200 w-full"
        ref={ref}
        inputRef={inputRef}
        placeholder={props.placeholder}
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