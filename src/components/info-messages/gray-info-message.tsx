type GrayInfoMessageProps = {
  message: string;
};

export default function GrayInfoMessage(props: GrayInfoMessageProps) {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-200 py-2 px-4 rounded-xl font-medium text-gray-500">
        {props.message}
      </div>
    </div>
  );
}