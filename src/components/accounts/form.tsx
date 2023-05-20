import {ChangeEvent, FormEvent, useState} from "react";
import Button from "../buttons/button.tsx";
import Select, {SelectOptionValue} from "../inputs/select.tsx";
import NumberInput from "../inputs/number-input.tsx";
import TextInput from "../inputs/text-input.tsx";
import {CONSTANTS} from "../../constants.ts";
import CardNumberInput from "../inputs/card-number-input.tsx";
import CardExpiresAtInput from "../inputs/card-expires-at-input.tsx";

export type AccountFormParams = {
  currency: string;
  balance: string;
  type: string;
  details: {
    account_number: string;
    card_number: string;
    card_holder: string;
    expires_at: string;
    system: string;
    bank_id: string;
  };
};

export type AccountFormErrors = {
  currency: string;
  balance: string;
  type: string;
  details: {
    account_number: string,
    card_number: string,
    card_holder: string,
    expires_at: string,
    system: string,
    bank_id: string,
  };
};

type AccountsFormProps = {
  initial: AccountFormParams;
  errors: AccountFormErrors;
  currencies: SelectOptionValue[],
  types: SelectOptionValue[],
  banks: SelectOptionValue[],
  cardSystems: SelectOptionValue[],
  loading: boolean;
  edit?: boolean;
  onSubmit: (form: AccountFormParams) => void;
};

export default function AccountsForm(props: AccountsFormProps) {
  const [form, setForm] = useState<AccountFormParams>(props.initial);

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev: AccountFormParams) => {
      return { ...prev, [name]: value }
    })
  }

  const handleDetailsSelectChange = (name: string, value: string) => {
    setForm((prev: AccountFormParams) => {
      return { ...prev, details: { ...prev.details, [name]: value } }
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setForm((prev: AccountFormParams) => {
      return { ...prev, [name]: value }
    })
  }

  const handleChangeDetails = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setForm((prev: AccountFormParams) => {
      return { ...prev, details: { ...prev.details, [name]: value } }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="mt-5 space-y-4">
      <Select error={props.errors.currency}
              defaultValue="0"
              selected={`${form.currency}`}
              name="currency"
              options={props.currencies}
              onChange={value => handleSelectChange('currency', value)}
              title="Валюта" />
      <NumberInput name="balance"
                   title="Баланс"
                   step=".01"
                   placeholder="Укажите баланс"
                   onChange={handleChange}
                   value={form.balance}
                   error={props.errors.balance} />
      <Select error={props.errors.type}
              defaultValue="0"
              selected={`${form.type}`}
              name="type"
              options={props.types}
              onChange={value => handleSelectChange('type', value)}
              title="Тип счета" />
      {form.type === CONSTANTS.ACCOUNT_BANK_ACCOUNT_TYPE &&<div className="pt-3 border-y-2 border-east-bay pb-3 space-y-4">
          <TextInput type="text"
                     name="account_number"
                     title="Номер счета"
                     placeholder="Введите номер счета в банке"
                     onChange={handleChangeDetails}
                     value={form.details.account_number}
                     error={props.errors.details.account_number} />
          <Select error={props.errors.details.bank_id}
                  defaultValue="0"
                  selected={`${form.details.bank_id}`}
                  name="type"
                  options={props.banks}
                  onChange={value => handleDetailsSelectChange('bank_id', value)}
                  title="Банк" />
      </div>}
      {form.type === CONSTANTS.ACCOUNT_CARD_TYPE &&<div className="py-3 border-y-2 border-east-bay space-y-4">
          <CardNumberInput name="card_number"
                           title="Номер карты"
                           placeholder="Введите номер карты"
                           onChange={handleChangeDetails}
                           value={form.details.card_number}
                           error={props.errors.details.card_number} />
          <TextInput type="text"
                     name="card_holder"
                     title="Имя держателя"
                     placeholder="Введите имя держателя карты"
                     onChange={handleChangeDetails}
                     value={form.details.card_holder}
                     error={props.errors.details.card_holder} />
          <CardExpiresAtInput name="expires_at"
                              title="Срок действия карты"
                              placeholder="Введите срок действия карты"
                              onChange={handleChangeDetails}
                              value={form.details.expires_at}
                              error={props.errors.details.expires_at} />
          <Select error={props.errors.details.system}
                  defaultValue="0"
                  selected={`${form.details.system}`}
                  name="system"
                  options={props.cardSystems}
                  onChange={value => handleDetailsSelectChange('system', value)}
                  title="Платежная система" />
          <Select error={props.errors.details.bank_id}
                  defaultValue="0"
                  selected={`${form.details.bank_id}`}
                  name="type"
                  options={props.banks}
                  onChange={value => handleDetailsSelectChange('bank_id', value)}
                  title="Банк" />
      </div>}
      <div className="pt-3 pb-2">
        <Button title="Добавить счёт"
                loading={props.loading} />
      </div>
    </form>
  );
}