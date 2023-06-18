import SelectOption from "./select/option.tsx";
import {useState} from "react";
import SelectOptionsRecursive from "./select/options-recursive.tsx";

export type SelectOptionValue = {
  value: string;
  title: string;
  subtitle: string;
  children: SelectOptionValue[];
};

type SelectProps = {
  title?: string;
  name: string;
  defaultValue: string;
  selected: string;
  error: string;
  onChange: (value: string) => void;
  options: SelectOptionValue[];
};

export default function Select(props: SelectProps) {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(props.defaultValue !== props.selected ? props.selected : props.defaultValue);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleOpened = () => {
    if (opened) {
      setSearchQuery("");
      setOpened(false);
    } else setOpened(true);
  }

  const select = (value: string) => {
    props.onChange(value);
    setValue(value);
    toggleOpened();
  }

  function filterObjectsByTitleSubtitle(
    arr: SelectOptionValue[],
    searchTerm: string
  ): SelectOptionValue[] {
    return arr.reduce((acc: SelectOptionValue[], obj) => {
      const hasMatch = obj.title.toLowerCase().includes(searchTerm.toLowerCase()) || obj.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      if (hasMatch) {
        const newObj = {...obj};
        if (newObj.children) {
          newObj.children = filterObjectsByTitleSubtitle(newObj.children, searchTerm);
        }
        acc.push(newObj);
      } else if (obj.children) {
        const filteredChildren = filterObjectsByTitleSubtitle(obj.children, searchTerm);
        if (filteredChildren.length > 0) {
          const newObj = {...obj, children: filteredChildren};
          acc.push(newObj);
        }
      }
      return acc;
    }, []);
  }

  const options = (): SelectOptionValue[] => {
    if (searchQuery === "") return [...props.options];

    return filterObjectsByTitleSubtitle([...props.options], searchQuery);
  }

  const getSelectedOption = (options: SelectOptionValue[]): null | SelectOptionValue => {
    if (value === props.defaultValue) return null;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) return options[i];

      const childrenOption = getSelectedOption(options[i].children)
      if (childrenOption) return childrenOption;
    }

    return null;
  }
  const selectedOption = getSelectedOption(props.options);

  return (
    <div className="relative">
      {props.title &&<label onClick={toggleOpened} htmlFor={props.name} className="ml-2.5 font-medium">{props.title}</label>}
      <input type="hidden" name={props.name} value={value} />
      <div onClick={toggleOpened} className={`mt-1 overflow-hidden rounded-t-lg cursor-pointer ${opened ? 'ring-2 ring-blue-400' : 'rounded-b-lg'}`}>
        {!selectedOption &&<SelectOption title="&nbsp;" selected={true} subtitle="не выбрано" />}
        {selectedOption &&<SelectOption title={selectedOption.title} selected={true} subtitle={selectedOption.subtitle} />}
      </div>
      {opened &&<div className="absolute shadow-xl z-10 overflow-x-hidden overflow-y-auto max-h-60 rounded-b-lg w-full">
        <div>
            <input type="text"
                   placeholder="Поиск..."
                   value={searchQuery}
                   onChange={(event) => setSearchQuery(event.target.value)}
                   className="w-full block -dark-shade-1 text-gray-800 font-medium placeholder-wild-blue-dark-shade-1 border-transparent focus:border-transparent focus:ring-0" />
        </div>
        <SelectOptionsRecursive level={0} options={options()} selectedOption={selectedOption} select={value => select(value)} />
        {options().length === 0 &&<div className="px-4 py-2 text-gray-500 bg-white font-medium">
            нет доступных опций для выбора
        </div>}
      </div>}
      {props.error !== '' &&<div className="font-medium text-red-500 text-xs ml-3 mt-1">
        {props.error}
      </div>}
    </div>
  );
}