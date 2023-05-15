import {ReactNode} from "react";

interface BlockProps {
  children: ReactNode
}

export default function Block(props: BlockProps): JSX.Element {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-5 py-3">
      {props.children}
    </div>
  );
}