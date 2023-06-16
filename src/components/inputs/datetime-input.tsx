import {ChangeEvent} from "react";

type DatetimeInputProps = {
  name: string;
  placeholder: string;
  value: string|number;
  error: string;
  title?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function DatetimeInput(props: DatetimeInputProps) {
  return (
    <div>
      {props.title &&<label htmlFor={props.name} className="ml-2.5 font-medium">{props.title}</label>}
      <input type="datetime-local"
             id={props.name}
             className="mt-1 pt-1.5 pb-0 px-2.5 block rounded-lg border-none focus:ring-0 bg-gray-100 placeholder-gray-400 font-medium  w-full"
             name={props.name}
             placeholder={props.placeholder}
             required={props.required}
             onChange={props.onChange}
             value={props.value}
             autoFocus={props.autoFocus}/>
      {props.error !== '' &&<div className="font-medium text-red-500 text-xs ml-3 mt-1">
        {props.error}
      </div>}
    </div>
  );
}