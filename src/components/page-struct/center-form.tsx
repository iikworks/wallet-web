import {ReactNode} from "react";

type CenterFormProps = {
  title: string;
  children: ReactNode;
};

export default function CenterForm(props: CenterFormProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-xl bg-sapling-light-shade text-flame-sea py-3 px-5">
        <h2 className="font-medium text-flame-sea text-2xl">{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
}