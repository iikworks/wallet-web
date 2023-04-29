import $api from "../api";
import {AxiosResponse} from "axios";
import {SubscriptionsListResponse} from "../models/responses/subscriptions/subscriptions-response.ts";

export default class SubscriptionsService {
  static async list(page: number): Promise<AxiosResponse<SubscriptionsListResponse>> {
    return $api.get<SubscriptionsListResponse>(`/subscriptions?page=${page}`)
  }
}
