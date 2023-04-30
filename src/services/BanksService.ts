import $api from "../api";
import {AxiosResponse} from "axios";
import {BankResponse} from "../models/responses/banks/bank-response.ts";
import {AllBanksResponse} from "../models/responses/banks/all-banks-response.ts";
import {BanksListResponse} from "../models/responses/banks/banks-response.ts";
import {BankFormParams, BankFormUpdateParams} from "../components/banks/form.tsx";

export default class BanksService {
  static async store(form: BankFormParams): Promise<AxiosResponse<BankResponse>> {
    return $api.post<BankResponse>('/banks', form)
  }

  static async getOneById(id: number): Promise<AxiosResponse<BankResponse>> {
    return $api.get<BankResponse>(`/banks/${id}`)
  }

  static async update(id: number, form: BankFormUpdateParams): Promise<AxiosResponse<BankResponse>> {
    return $api.patch<BankResponse>(`/banks/${id}`, form)
  }

  static async all(): Promise<AxiosResponse<AllBanksResponse>> {
    return $api.get<AllBanksResponse>(`/banks/all`)
  }

  static async list(page: number): Promise<AxiosResponse<BanksListResponse>> {
    return $api.get<BanksListResponse>(`/banks?page=${page}`)
  }
}
