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
    <div onClick={props.onClick} className={`py-2 px-4 cursor-pointer ${props.selected ? 'bg-sapling' : 'bg-sapling-light-shade hover:bg-sapling transition'}`}
         style={{ paddingLeft: `${level + 1}rem`}}>
      <div className="font-medium text-sapling-dark-shade-2">
        {props.title}
      </div>
      <div className="text-sapling-dark-shade-2 opacity-70">
        {props.subtitle}
      </div>
    </div>
  );
}