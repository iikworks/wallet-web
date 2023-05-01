import {Link} from "react-router-dom";

type GoToAllProps = {
  title: string;
  link: string;
};

export default function GoToAll(props: GoToAllProps) {
  return (
    <div className="flex justify-center mt-3">
      <Link to={props.link}
         className="text-gray-500 font-medium hover:text-blue-400 transition">{props.title}</Link>
    </div>
  );
}