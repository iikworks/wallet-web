import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useAlert from "../../hooks/use-alert.tsx";
import BanksForm, {BankFormErrors, BankFormParams} from "../../components/banks/form.tsx";
import BanksService from "../../services/BanksService.ts";

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
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-white py-3 px-5">
        <h2 className="font-medium text-xl">Добавление банка</h2>
        <BanksForm errors={errors}
                          onSubmit={onSubmit}
                          loading={loading}
                          initial={{
                            title: '',
                          }} />
      </div>
    </div>
  );
}