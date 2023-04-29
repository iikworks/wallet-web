import $api from "../api";
import {AxiosResponse} from "axios";
import {AccountsListResponse} from "../models/responses/accounts/accounts-response.ts";
import {AllAccountsResponse} from "../models/responses/accounts/all-accounts-response.ts";

export default class AccountsService {
  static async all(): Promise<AxiosResponse<AllAccountsResponse>> {
    return $api.get<AllAccountsResponse>(`/accounts/all`)
  }

  static async list(page: number): Promise<AxiosResponse<AccountsListResponse>> {
    return $api.get<AccountsListResponse>(`/accounts?page=${page}`)
  }
}
