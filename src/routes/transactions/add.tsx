import {SelectOptionValue} from "../../components/inputs/select.tsx";
import AccountsService from "../../services/AccountsService.ts";
import {useContext, useEffect, useState} from "react";
import OrganizationsService from "../../services/OrganizationsService.ts";
import {convertAccountsToOptions, convertOrganizationsToOptionsRecursive} from "../../functions.ts";
import TransactionsForm, {TransactionsFormErrors, TransactionsFormParams} from "../../components/transactions/form.tsx";
import TransactionsService from "../../services/TransactionsService.ts";
import {useNavigate} from "react-router-dom";
import {CONSTANTS} from "../../constants.ts";
import moment from 'moment'
import {Context} from "../../main.tsx";
import useAlert from "../../hooks/use-alert.tsx";
import CenterForm from "../../components/page-struct/center-form.tsx";

export default function TransactionsAdd() {
  const { setAlert } = useAlert();
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [accountsOptions, setAccountsOptions] = useState<SelectOptionValue[]>([]);
  const [organizationsOptions, setOrganizationsOptions] = useState<SelectOptionValue[]>([]);
  const [errors, setErrors] = useState<TransactionsFormErrors>({
    account_id: '',
    organization_id: '',
    type: '',
    amount: '',
    date: '',
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

  const onSubmit = async (form: TransactionsFormParams) => {
    setLoading(true);

    try {
      await TransactionsService.store(form);
      await store.UpdateUser();
      setAlert('Добавлено.', 'success')
      navigate("/transactions");
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
          type: '',
          amount: '',
          date: '',
        })
        return;
      }

      setErrors({
        account_id: 'Произошла какая-то ошибка. Попробуйте позже.',
        organization_id: '',
        type: '',
        amount: '',
        date: '',
      })
    }
  }

  useEffect(() => {
    fetchAccounts();
    fetchOrganizations();
  }, []);

  return (
    <CenterForm title="Добавление транзакции">
      <TransactionsForm errors={errors}
                        onSubmit={onSubmit}
                        loading={loading}
                        initial={{
                          account_id: 0,
                          organization_id: 0,
                          type: CONSTANTS.EXPENSE_TYPE,
                          amount: '0.01',
                          date: moment().format('YYYY-MM-DD\\THH:mm'),
                        }}
                        accounts={accountsOptions}
                        organizations={organizationsOptions} />
    </CenterForm>
  );
}