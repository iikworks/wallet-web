import {SelectOptionValue} from "../../components/inputs/select.tsx";
import {useEffect, useState} from "react";
import OrganizationsService from "../../services/OrganizationsService.ts";
import {convertOrganizationsToOptionsRecursive} from "../../functions.ts";
import {useNavigate, useParams} from "react-router-dom";
import OrganizationsForm, {
  OrganizationFormErrors,
  OrganizationFormParams,
  OrganizationFormUpdateParams
} from "../../components/organizations/form.tsx";
import {Organization} from "../../models/organization.ts";
import useAlert from "../../hooks/use-alert.tsx";
import CenterForm from "../../components/page-struct/center-form.tsx";

type RouteParams = {
  id: string;
};

export default function OrganizationsEdit() {
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const params = useParams<RouteParams>()
  const [organizationsOptions, setOrganizationsOptions] = useState<SelectOptionValue[] | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [errors, setErrors] = useState<OrganizationFormErrors>({
    parent_id: '',
    title: '',
    vulgar_title: '',
  })
  const [loading, setLoading] = useState(false);

  const fetchOrganization = async (id: number) => {
    try {
      const response = await OrganizationsService.getOneById(id);
      setOrganization(response.data.data);
    } catch (e) {
      navigate("/organizations");
    }
  };

  const fetchOrganizations = async () => {
    const response = await OrganizationsService.all();
    setOrganizationsOptions(convertOrganizationsToOptionsRecursive(response.data.data, true));
  };

  const onSubmit = async (form: OrganizationFormParams) => {
    if(!organization) return;
    setLoading(true);

    try {
      const data: OrganizationFormUpdateParams = {};
      if(form.parent_id !== organization.parent?.id) data.parent_id = form.parent_id;
      if(form.title !== organization.title) data.title = form.title;
      if(form.vulgar_title !== organization.vulgar_title) data.vulgar_title = form.vulgar_title;


      await OrganizationsService.update(organization.id, data);
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
    fetchOrganization(params.id ? parseInt(params.id) : 0);
    fetchOrganizations();
  }, []);

  return (
    <CenterForm title="Редактирование организации">
      {organization && organizationsOptions &&<OrganizationsForm errors={errors}
                                                                 onSubmit={onSubmit}
                                                                 edit={true}
                                                                 loading={loading}
                                                                 initial={{
                                                                   parent_id: organization.parent ? organization.parent.id : 0,
                                                                   title: organization.title,
                                                                   vulgar_title: organization.vulgar_title,
                                                                 }}
                                                                 organizations={organizationsOptions} />}
    </CenterForm>
  );
}