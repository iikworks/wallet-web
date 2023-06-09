import {RotatingLines} from "react-loader-spinner";

type ButtonProps = {
  title: string;
  loading?: boolean;
  classes?: string;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.loading}
      className={`bg-blue-400 flex justify-center items-center gap-2 text-white font-medium w-full py-2 rounded-lg
      ${props.loading ? 'opacity-50' : 'hover:bg-blue-500 transition'}
      ${props.classes}`}
    >
      {props.loading &&<RotatingLines
          strokeColor="white"
          strokeWidth="3"
          animationDuration="0.75"
          width="20"
          visible={true}
      />}
      {props.title}
    </button>
  );
}