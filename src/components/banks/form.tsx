import {ChangeEvent, FormEvent, useState} from "react";
import TextInput from "../inputs/text-input.tsx";
import Button from "../buttons/button.tsx";

export type BankFormParams = {
  title: string;
};

export type BankFormUpdateParams = {
  title?: string;
};

export type BankFormErrors = {
  title: string;
};

type OrganizationsFormProps = {
  initial: BankFormParams;
  errors: BankFormErrors;
  loading: boolean;
  edit?: boolean;
  onSubmit: (form: BankFormParams) => void;
};

export default function BanksForm(props: OrganizationsFormProps) {
  const [form, setForm] = useState<BankFormParams>(props.initial);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setForm((prev: BankFormParams) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="mt-5 space-y-4">
      <TextInput type="text"
                 name="title"
                 title="Наименование"
                 placeholder="Введите наименование банка"
                 onChange={handleChange}
                 value={form.title}
                 error={props.errors.title} />
      <div className="pt-3 pb-2">
        <Button title={props.edit ? 'Сохранить банк' : 'Добавить банк'}
                loading={props.loading} />
      </div>
    </form>
  );
}