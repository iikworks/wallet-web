import {ChangeEvent, FormEvent, useState} from "react";
import Select, {SelectOptionValue} from "../inputs/select.tsx";
import TextInput from "../inputs/text-input.tsx";
import Button from "../buttons/button.tsx";

export type OrganizationFormParams = {
  parent_id?: number;
  title: string;
  vulgar_title: string;
};

export type OrganizationFormUpdateParams = {
  parent_id?: number;
  title?: string;
  vulgar_title?: string;
};

export type OrganizationFormErrors = {
  parent_id: string;
  title: string;
  vulgar_title: string;
};

type OrganizationsFormProps = {
  organizations: SelectOptionValue[];
  initial: OrganizationFormParams;
  errors: OrganizationFormErrors;
  loading: boolean;
  edit?: boolean;
  onSubmit: (form: OrganizationFormParams) => void;
};

export default function OrganizationsForm(props: OrganizationsFormProps) {
  const [form, setForm] = useState<OrganizationFormParams>(props.initial);

  const setParentId = (value: string) => {
    setForm((prev: OrganizationFormParams) => {
      return { ...prev, parent_id: parseInt(value) }
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setForm((prev: OrganizationFormParams) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="mt-5 space-y-4">
      <Select error={props.errors.parent_id}
              defaultValue="0"
              selected={`${form.parent_id}`}
              name="organization_id"
              options={props.organizations}
              onChange={setParentId}
              title="Материнская организация" />
      <TextInput type="text"
                 name="title"
                 title="Наименование"
                 placeholder="Введите наименование организации"
                 onChange={handleChange}
                 value={form.title}
                 error={props.errors.title} />
      <TextInput type="text"
                 name="vulgar_title"
                 title="Отображаемое наименование"
                 placeholder="Введите отображаемое наименование организации"
                 onChange={handleChange}
                 value={form.vulgar_title}
                 error={props.errors.vulgar_title} />
      <div className="pt-3 pb-2">
        <Button title={props.edit ? 'Сохранить организацию' : 'Добавить организацию'}
                loading={props.loading} />
      </div>
    </form>
  );
}