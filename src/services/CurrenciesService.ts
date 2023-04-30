import $api from "../api";
import {AxiosResponse} from "axios";
import {CurrenciesResponse} from "../models/responses/currencies/currencies-response.ts";

export default class CurrenciesService {
  static async all(): Promise<AxiosResponse<CurrenciesResponse>> {
    return $api.get<CurrenciesResponse>(`/currencies`)
  }
}
