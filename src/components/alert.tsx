import useAlert from "../hooks/use-alert.tsx";

export default function Alert() {
  const { text, type } = useAlert();

  const colorClasses = {
    'error': 'bg-red-300/50 text-red-500',
    'success': 'bg-green-300/50 text-green-500',
  };

  if (text && type) {
    return (
      <div className="fixed z-50 top-6 right-6">
        <div className={`cursor-pointer max-w-sm backdrop-blur font-medium py-2 px-4 rounded-2xl ${colorClasses[type]}`}>
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed z-50 top-6 right-6"></div>
  );
}