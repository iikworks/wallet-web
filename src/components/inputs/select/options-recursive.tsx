import {SelectOptionValue} from "../select.tsx";
import SelectOption from "./option.tsx";

type SelectOptionsRecursiveProps = {
  options: SelectOptionValue[];
  level: number;
  selectedOption: null | SelectOptionValue;
  select: (value: string) => void;
};

export default function SelectOptionsRecursive(props: SelectOptionsRecursiveProps) {
  return (
    <>
      {props.options.map(option => {
        return (
          <div key={option.value}>
            <SelectOption selected={props.selectedOption ? props.selectedOption.value === option.value : false}
                          title={option.title}
                          level={props.level}
                          onClick={() => props.select(option.value)}
                          subtitle={option.subtitle} />
            {option.children.length > 0 &&<SelectOptionsRecursive options={option.children}
                                                                  level={props.level + 1}
                                                                  selectedOption={props.selectedOption}
                                                                  select={value => props.select(value)} />}
          </div>
        );
      })}
    </>
  );
}