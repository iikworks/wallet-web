import $api from "../api";
import {AxiosResponse} from "axios";
import {AllOrganizationsResponse} from "../models/responses/organizations/all-organizations-response.ts";
import {OrganizationResponse} from "../models/responses/organizations/organization-response.ts";
import {OrganizationFormParams, OrganizationFormUpdateParams} from "../components/organizations/form.tsx";
import {OrganizationsListResponse} from "../models/responses/organizations/organizations-response.ts";

export default class OrganizationsService {
  static async store(form: OrganizationFormParams): Promise<AxiosResponse<OrganizationResponse>> {
    return $api.post<OrganizationResponse>('/organizations', form)
  }

  static async getOneById(id: number): Promise<AxiosResponse<OrganizationResponse>> {
    return $api.get<OrganizationResponse>(`/organizations/${id}`)
  }

  static async update(id: number, form: OrganizationFormUpdateParams): Promise<AxiosResponse<OrganizationResponse>> {
    return $api.patch<OrganizationResponse>(`/organizations/${id}`, form)
  }

  static async all(): Promise<AxiosResponse<AllOrganizationsResponse>> {
    return $api.get<AllOrganizationsResponse>(`/organizations/all`)
  }

  static async list(page: number): Promise<AxiosResponse<OrganizationsListResponse>> {
    return $api.get<OrganizationsListResponse>(`/organizations?page=${page}`)
  }
}
