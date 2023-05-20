import {ReactNode} from "react";

type CenterFormProps = {
  title: string;
  children: ReactNode;
};

export default function CenterForm(props: CenterFormProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-xl bg-east-bay-light-shade text-gray-200 py-3 px-5">
        <h2 className="font-medium text-gray-200 text-2xl">{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
}