import Select, {SelectOptionValue} from "../inputs/select.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import NumberInput from "../inputs/number-input.tsx";
import Button from "../buttons/button.tsx";

type SubscriptionsFormProps = {
  accounts: SelectOptionValue[];
  organizations: SelectOptionValue[];
  currencies: SelectOptionValue[];
  initial: SubscriptionsFormParams;
  errors: SubscriptionsFormErrors;
  loading: boolean;
  onSubmit: (form: SubscriptionsFormParams) => void;
};

export type SubscriptionsFormParams = {
  account_id: number;
  organization_id: number;
  currency: string;
  amount: string;
  day: string;
};

export type SubscriptionsFormErrors = {
  account_id: string;
  organization_id: string;
  currency: string;
  amount: string;
  day: string;
};

export default function SubscriptionsForm(props: SubscriptionsFormProps) {
  const [form, setForm] = useState<SubscriptionsFormParams>(props.initial);

  const setAccountId = (value: string) => {
    setForm((prev: SubscriptionsFormParams) => {
      return { ...prev, account_id: parseInt(value) }
    })
  }

  const setOrganizationId = (value: string) => {
    setForm((prev: SubscriptionsFormParams) => {
      return { ...prev, organization_id: parseInt(value) }
    })
  }

  const setCurrency = (value: string) => {
    setForm((prev: SubscriptionsFormParams) => {
      return { ...prev, currency: value }
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setForm((prev: SubscriptionsFormParams) => {
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
      <Select error={props.errors.currency}
              defaultValue="0"
              selected={`${form.currency}`}
              name="currency"
              options={props.currencies}
              onChange={setCurrency}
              title="Валюта" />
      <NumberInput name="amount"
                 title="Сумма"
                 step=".01"
                 placeholder="Введите сумму"
                 onChange={handleChange}
                 value={form.amount}
                 error={props.errors.amount} />
      <NumberInput name="day"
                 title="День списания подписки"
                 step="1"
                 min="1"
                 max="31"
                 placeholder="Укажите день списания подписки"
                 onChange={handleChange}
                 value={form.day}
                 error={props.errors.day} />
      <div className="pt-3 pb-2">
        <Button title="Добавить подписку" loading={props.loading} />
      </div>
    </form>
  );
}