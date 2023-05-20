import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

type PlusButtonProps = {
  link: string;
};

export default function PlusButton(props: PlusButtonProps) {
  return (
    <Link className="text-flame-sea hover:text-flame-sea-light-shade transition"
       to={props.link}>
      <PlusCircleIcon className="w-6 h-6" />
    </Link>
  );
}