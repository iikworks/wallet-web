import AccountsForm, {AccountFormErrors, AccountFormParams} from "../../components/accounts/form.tsx";
import {useContext, useEffect, useState} from "react";
import {
  convertBanksToOptions, convertCardSystemsToOptions,
  convertCurrenciesToOptions, getAccountTypesOptions,
} from "../../functions.ts";
import CurrenciesService from "../../services/CurrenciesService.ts";
import {SelectOptionValue} from "../../components/inputs/select.tsx";
import BanksService from "../../services/BanksService.ts";
import CenterForm from "../../components/page-struct/center-form.tsx";
import CardSystemsService from "../../services/CardSystemsService.ts";
import AccountsService from "../../services/AccountsService.ts";
import useAlert from "../../hooks/use-alert.tsx";
import {useNavigate} from "react-router-dom";
import {Context} from "../../main.tsx";

export default function AccountsAdd() {
  const { setAlert } = useAlert();
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [currenciesOptions, setCurrenciesOptions] = useState<SelectOptionValue[]>([]);
  const [banksOptions, setBanksOptions] = useState<SelectOptionValue[]>([]);
  const [cardSystemsOptions, setCardSystemsOptions] = useState<SelectOptionValue[]>([]);
  const [errors, setErrors] = useState<AccountFormErrors>({
    currency: '',
    balance: '',
    type: '',
    details: {
      account_number: '',
      card_number: '',
      card_holder: '',
      expires_at: '',
      system: '',
      bank_id: '',
    },
  })
  const [loading, setLoading] = useState(false);

  const fetchCurrencies = async () => {
    const response = await CurrenciesService.all();
    setCurrenciesOptions(convertCurrenciesToOptions(response.data.data));
  };

  const fetchBanks = async () => {
    const response = await BanksService.all();
    setBanksOptions(convertBanksToOptions(response.data.data));
  };

  const fetchCardSystems = async () => {
    const response = await CardSystemsService.all();
    setCardSystemsOptions(convertCardSystemsToOptions(response.data.data));
  };

  const onSubmit = async (form: AccountFormParams) => {
    setLoading(true);

    try {
      const data = {...form};
      await AccountsService.store(data);
      await store.UpdateUser();
      navigate("/accounts");
      setAlert('Добавлено.', 'success')
    } catch (e: any) {
      setLoading(false);
      if (e.response?.data?.errors) {
        const errors = { ...e.response.data.errors };
        if (e.response.data.errors.details) {
          errors.details = JSON.parse(e.response.data.errors.details)
        }

        setErrors(errors);
        return;
      }
      else if(e.response?.data?.message) {
        setErrors({
          currency: e.response.data.message,
          balance: '',
          type: '',
          details: {
            account_number: '',
            card_number: '',
            card_holder: '',
            expires_at: '',
            system: '',
            bank_id: '',
          },
        })
        return;
      }

      setErrors({
        currency: 'Произошла какая-то ошибка. Попробуйте позже.',
        balance: '',
        type: '',
        details: {
          account_number: '',
          card_number: '',
          card_holder: '',
          expires_at: '',
          system: '',
          bank_id: '',
        },
      })
    }
  }

  useEffect(() => {
    fetchCurrencies();
    fetchBanks();
    fetchCardSystems();
  }, [])

  return (
    <CenterForm title="Добавление счёта">
      <AccountsForm errors={errors}
                    onSubmit={onSubmit}
                    loading={loading}
                    currencies={currenciesOptions}
                    banks={banksOptions}
                    types={getAccountTypesOptions()}
                    cardSystems={cardSystemsOptions}
                    initial={{
                      currency: '',
                      balance: '',
                      type: '',
                      details: {
                        account_number: '',
                        card_number: '',
                        card_holder: '',
                        expires_at: '',
                        system: '',
                        bank_id: '0',
                      },
                    }} />
    </CenterForm>
  );
}