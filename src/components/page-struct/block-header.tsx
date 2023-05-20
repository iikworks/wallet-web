import {ReactNode} from "react";

type BlockHeaderProps = {
  title: string;
  classes?: string;
  link?: ReactNode;
};

export default function BlockHeader(props: BlockHeaderProps) {
  return (
    <div className={`mx-4 flex justify-between items-center mb-3 ${props.classes}`}>
      <h2 className="text-2xl text-sapling-dark-shade-2 font-medium">{props.title}</h2>
      {props.link}
    </div>
  );
}