type SelectOptionProps = {
  title: string;
  subtitle: string;
  level?: number;
  selected?: boolean;
  onClick?: () => void;
};

export default function SelectOption(props: SelectOptionProps) {
  let level = 0;
  if (props.level !== undefined) level = props.level;

  return (
    <div onClick={props.onClick} className={`py-2 px-4 cursor-pointer ${props.selected ? 'bg-gray-100' : 'bg-white hover:bg-gray-100 transition'}`}
         style={{ paddingLeft: `${level + 1}rem`}}>
      <div className="font-medium">
        {props.title}
      </div>
      <div className="text-gray-500">
        {props.subtitle}
      </div>
    </div>
  );
}