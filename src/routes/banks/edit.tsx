import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
  OrganizationFormUpdateParams
} from "../../components/organizations/form.tsx";
import useAlert from "../../hooks/use-alert.tsx";
import {Bank} from "../../models/bank.ts";
import BanksForm, {BankFormErrors, BankFormParams} from "../../components/banks/form.tsx";
import BanksService from "../../services/BanksService.ts";

type RouteParams = {
  id: string;
};

export default function BanksEdit() {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const params = useParams<RouteParams>()
  const [bank, setBank] = useState<Bank | null>(null);
  const [errors, setErrors] = useState<BankFormErrors>({
    title: '',
  })
  const [loading, setLoading] = useState(false);

  const fetchBank = async (id: number) => {
    try {
      const response = await BanksService.getOneById(id);
      setBank(response.data.data);
    } catch (e) {
      navigate("/banks");
    }
  };

  const onSubmit = async (form: BankFormParams) => {
    if(!bank) return;
    setLoading(true);

    try {
      const data: OrganizationFormUpdateParams = {};
      if(form.title !== bank.title) data.title = form.title;


      await BanksService.update(bank.id, data);
      setLoading(false);
      setAlert('Сохранено.', 'success')
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

  useEffect(() => {
    fetchBank(params.id ? parseInt(params.id) : 0);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-white py-3 px-5">
        <h2 className="font-medium text-xl">Редактирование банка</h2>
        {bank &&<BanksForm errors={errors}
                          onSubmit={onSubmit}
                          edit={true}
                          loading={loading}
                          initial={{
                            title: bank.title,
                          }} />}
      </div>
    </div>
  );
}