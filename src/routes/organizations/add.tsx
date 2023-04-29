import {SelectOptionValue} from "../../components/inputs/select.tsx";
import {useEffect, useState} from "react";
import OrganizationsService from "../../services/OrganizationsService.ts";
import {convertOrganizationsToOptionsRecursive} from "../../functions.ts";
import {useNavigate} from "react-router-dom";
import OrganizationsForm, {OrganizationFormErrors, OrganizationFormParams} from "../../components/organizations/form.tsx";
import useAlert from "../../hooks/use-alert.tsx";

export default function OrganizationsAdd() {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const [organizationsOptions, setOrganizationsOptions] = useState<SelectOptionValue[]>([]);
  const [errors, setErrors] = useState<OrganizationFormErrors>({
    parent_id: '',
    title: '',
    vulgar_title: '',
  })
  const [loading, setLoading] = useState(false);

  const fetchOrganizations = async () => {
    const response = await OrganizationsService.all();
    setOrganizationsOptions(convertOrganizationsToOptionsRecursive(response.data.data));
  };

  const onSubmit = async (form: OrganizationFormParams) => {
    setLoading(true);

    try {
      const data = {...form};
      if (data.parent_id === 0) data.parent_id = undefined;
      await OrganizationsService.store(data);
      navigate("/organizations");
      setAlert('Добавлено.', 'success')
    } catch (e: any) {
      setLoading(false);
      if (e.response?.data?.errors) {
        setErrors(e.response.data.errors);
        return;
      }
      else if(e.response?.data?.message) {
        setErrors({
          parent_id: e.response.data.message,
          title: '',
          vulgar_title: '',
        })
        return;
      }

      setErrors({
        parent_id: 'Произошла какая-то ошибка. Попробуйте позже.',
        title: '',
        vulgar_title: '',
      })
    }
  }

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-white py-3 px-5">
        <h2 className="font-medium text-xl">Добавление организации</h2>
        <OrganizationsForm errors={errors}
                          onSubmit={onSubmit}
                          loading={loading}
                          initial={{
                            parent_id: 0,
                            title: '',
                            vulgar_title: '',
                          }}
                          organizations={organizationsOptions} />
      </div>
    </div>
  );
}