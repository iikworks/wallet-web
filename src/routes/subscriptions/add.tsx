import {SelectOptionValue} from "../../components/inputs/select.tsx";
import AccountsService from "../../services/AccountsService.ts";
import {useEffect, useState} from "react";
import OrganizationsService from "../../services/OrganizationsService.ts";
import {
  convertAccountsToOptions,
  convertCurrenciesToOptions,
  convertOrganizationsToOptionsRecursive
} from "../../functions.ts";
import {useNavigate} from "react-router-dom";
import useAlert from "../../hooks/use-alert.tsx";
import SubscriptionsForm, {
  SubscriptionsFormErrors,
  SubscriptionsFormParams
} from "../../components/subscriptions/form.tsx";
import SubscriptionsService from "../../services/SubscriptionsService.ts";
import CurrenciesService from "../../services/CurrenciesService.ts";

export default function SubscriptionsAdd() {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const [accountsOptions, setAccountsOptions] = useState<SelectOptionValue[]>([]);
  const [organizationsOptions, setOrganizationsOptions] = useState<SelectOptionValue[]>([]);
  const [currenciesOptions, setCurrenciesOptions] = useState<SelectOptionValue[]>([]);
  const [errors, setErrors] = useState<SubscriptionsFormErrors>({
    account_id: '',
    organization_id: '',
    currency: '',
    amount: '',
    day: '',
  })
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    const response = await AccountsService.all();
    setAccountsOptions(convertAccountsToOptions(response.data.data));
  };

  const fetchOrganizations = async () => {
    const response = await OrganizationsService.all();
    setOrganizationsOptions(convertOrganizationsToOptionsRecursive(response.data.data));
  };

  const fetchCurrencies = async () => {
    const response = await CurrenciesService.all();
    setCurrenciesOptions(convertCurrenciesToOptions(response.data.data));
  };

  const onSubmit = async (form: SubscriptionsFormParams) => {
    setLoading(true);

    try {
      await SubscriptionsService.store(form);
      setAlert('Добавлено.', 'success')
      navigate("/subscriptions");
    } catch (e: any) {
      setLoading(false);
      if (e.response?.data?.errors) {
        setErrors(e.response.data.errors);
        return;
      }
      else if(e.response?.data?.message) {
        setErrors({
          account_id: e.response.data.message,
          organization_id: '',
          currency: '',
          amount: '',
          day: '',
        })
        return;
      }

      setErrors({
        account_id: 'Произошла какая-то ошибка. Попробуйте позже.',
        organization_id: '',
        currency: '',
        amount: '',
        day: '',
      })
    }
  }

  useEffect(() => {
    fetchAccounts();
    fetchOrganizations();
    fetchCurrencies();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-white py-3 px-5">
        <h2 className="font-medium text-xl">Добавление подписки</h2>
        <SubscriptionsForm errors={errors}
                          onSubmit={onSubmit}
                          loading={loading}
                          initial={{
                            account_id: 0,
                            organization_id: 0,
                            currency: '',
                            amount: '0.01',
                            day: '1',
                          }}
                          currencies={currenciesOptions}
                          accounts={accountsOptions}
                          organizations={organizationsOptions} />
      </div>
    </div>
  );
}