import {ReactNode} from "react";

interface BlockProps {
  children: ReactNode
}

export default function Block(props: BlockProps): JSX.Element {
  return (
    <div className="bg-east-bay-light-shade rounded-xl px-5 py-3">
      {props.children}
    </div>
  );
}