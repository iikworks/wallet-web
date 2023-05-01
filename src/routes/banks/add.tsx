import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useAlert from "../../hooks/use-alert.tsx";
import BanksForm, {BankFormErrors, BankFormParams} from "../../components/banks/form.tsx";
import BanksService from "../../services/BanksService.ts";
import CenterForm from "../../components/page-struct/center-form.tsx";

export default function BanksAdd() {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<BankFormErrors>({
    title: '',
  })
  const [loading, setLoading] = useState(false);

  const onSubmit = async (form: BankFormParams) => {
    setLoading(true);

    try {
      await BanksService.store(form);
      navigate("/banks");
      setAlert('Добавлено.', 'success')
    } catch (e: any) {
      setLoading(false);
      if (e.response?.data?.errors) {
        setErrors(e.response.data.errors);
        return;
      }
      else if(e.response?.data?.message) {
        setErrors({
          title: e.response.data.message,
        })
        return;
      }

      setErrors({
        title: 'Произошла какая-то ошибка. Попробуйте позже.',
      })
    }
  }

  return (
    <CenterForm title="Добавление банка">
      <BanksForm errors={errors}
                 onSubmit={onSubmit}
                 loading={loading}
                 initial={{
                   title: '',
                 }} />
    </CenterForm>
  );
}