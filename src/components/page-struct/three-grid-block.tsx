import {ReactNode} from "react";

type ThreeGridBlockProps = {
  children: ReactNode;
};

export default function ThreeGridBlock(props: ThreeGridBlockProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {props.children}
    </div>
  );
}