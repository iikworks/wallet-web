import Select, {SelectOptionValue} from "../inputs/select.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import NumberInput from "../inputs/number-input.tsx";
import {getTransactionTypesSelectOptions} from "../../functions.ts";
import DatetimeInput from "../inputs/datetime-input.tsx";
import Button from "../buttons/button.tsx";

type TransactionsFormProps = {
  accounts: SelectOptionValue[];
  organizations: SelectOptionValue[];
  initial: TransactionsFormParams;
  errors: TransactionsFormErrors;
  loading: boolean;
  onSubmit: (form: TransactionsFormParams) => void;
};

export type TransactionsFormParams = {
  account_id: number;
  organization_id: number;
  type: string;
  amount: string;
  date: string;
};

export type TransactionsFormErrors = {
  account_id: string;
  organization_id: string;
  type: string;
  amount: string;
  date: string;
};

export default function TransactionsForm(props: TransactionsFormProps) {
  const [form, setForm] = useState<TransactionsFormParams>(props.initial);

  const setAccountId = (value: string) => {
    setForm((prev: TransactionsFormParams) => {
      return { ...prev, account_id: parseInt(value) }
    })
  }

  const setOrganizationId = (value: string) => {
    setForm((prev: TransactionsFormParams) => {
      return { ...prev, organization_id: parseInt(value) }
    })
  }

  const setType = (value: string) => {
    setForm((prev: TransactionsFormParams) => {
      return { ...prev, type: value }
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setForm((prev: TransactionsFormParams) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="mt-5 space-y-4">
      <Select error={props.errors.account_id}
              defaultValue="0"
              selected={`${form.account_id}`}
              name="account_id"
              options={props.accounts}
              onChange={setAccountId}
              title="Счёт" />
      <Select error={props.errors.organization_id}
              defaultValue="0"
              selected={`${form.organization_id}`}
              name="organization_id"
              options={props.organizations}
              onChange={setOrganizationId}
              title="Организация" />
      <Select error={props.errors.type}
              defaultValue="0"
              selected={form.type}
              name="type"
              options={getTransactionTypesSelectOptions()}
              onChange={setType}
              title="Тип" />
      <NumberInput name="amount"
                 title="Сумма"
                 step=".01"
                 placeholder="Введите сумму"
                 onChange={handleChange}
                 value={form.amount}
                 error={props.errors.amount} />
      <DatetimeInput name="date"
                 title="Дата"
                 placeholder="Выберите дату"
                 onChange={handleChange}
                 value={form.date}
                 error={props.errors.date} />
      <div className="pt-3 pb-2">
        <Button title="Добавить транзакцию" loading={props.loading} />
      </div>
    </form>
  );
}