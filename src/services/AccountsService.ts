import $api from "../api";
import {AxiosResponse} from "axios";
import {AccountsListResponse} from "../models/responses/accounts/accounts-response.ts";
import {AllAccountsResponse} from "../models/responses/accounts/all-accounts-response.ts";
import {AccountResponse} from "../models/responses/accounts/account-response.ts";
import {AccountFormParams} from "../components/accounts/form.tsx";

export default class AccountsService {
  static async store(form: AccountFormParams): Promise<AxiosResponse<AccountResponse>> {
    return $api.post<AccountResponse>(`/accounts`, form)
  }

  static async all(): Promise<AxiosResponse<AllAccountsResponse>> {
    return $api.get<AllAccountsResponse>(`/accounts/all`)
  }

  static async list(page: number): Promise<AxiosResponse<AccountsListResponse>> {
    return $api.get<AccountsListResponse>(`/accounts?page=${page}`)
  }
}
