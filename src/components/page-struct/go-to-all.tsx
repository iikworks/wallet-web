import {Link} from "react-router-dom";

type GoToAllProps = {
  title: string;
  link: string;
};

export default function GoToAll(props: GoToAllProps) {
  return (
    <div className="flex justify-center mt-3">
      <Link to={props.link}
         className="text-flame-sea font-medium hover:text-flame-sea-light-shade transition">{props.title}</Link>
    </div>
  );
}