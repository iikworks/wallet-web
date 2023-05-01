import $api from "../api";
import {AxiosResponse} from "axios";
import {CardSystemsResponse} from "../models/responses/card-systems/card-systems-response.ts";

export default class CardSystemsService {
  static async all(): Promise<AxiosResponse<CardSystemsResponse>> {
    return $api.get<CardSystemsResponse>(`/card-systems`)
  }
}
