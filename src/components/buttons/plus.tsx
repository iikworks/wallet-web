import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

type PlusButtonProps = {
  link: string;
};

export default function PlusButton(props: PlusButtonProps) {
  return (
    <Link className="text-indigo-500 hover:text-indigo-600 transition"
       to={props.link}>
      <PlusCircleIcon className="w-6 h-6" />
    </Link>
  );
}