import $api from "../api";
import {AxiosResponse} from "axios";
import {SubscriptionsListResponse} from "../models/responses/subscriptions/subscriptions-response.ts";
import {SubscriptionResponse} from "../models/responses/subscriptions/subscription-response.ts";
import {SubscriptionsFormParams} from "../components/subscriptions/form.tsx";

export default class SubscriptionsService {
  static async store(form: SubscriptionsFormParams): Promise<AxiosResponse<SubscriptionResponse>> {
    return $api.post<SubscriptionResponse>('/subscriptions', form)
  }

  static async list(page: number): Promise<AxiosResponse<SubscriptionsListResponse>> {
    return $api.get<SubscriptionsListResponse>(`/subscriptions?page=${page}`)
  }
}
