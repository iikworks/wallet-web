import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

type PlusButtonProps = {
  link: string;
};

export default function PlusButton(props: PlusButtonProps) {
  return (
    <Link className="text-gray-500 hover:text-gray-700 transition"
       to={props.link}>
      <PlusCircleIcon className="w-6 h-6" />
    </Link>
  );
}