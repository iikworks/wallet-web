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
    <div onClick={props.onClick} className={`py-2 px-4 cursor-pointer ${props.selected ? 'bg-east-bay' : 'bg-east-bay-light-shade hover:bg-east-bay transition'}`}
         style={{ paddingLeft: `${level + 1}rem`}}>
      <div className="font-semibold text-gray-200">
        {props.title}
      </div>
      <div className="font-medium text-gray-300">
        {props.subtitle}
      </div>
    </div>
  );
}