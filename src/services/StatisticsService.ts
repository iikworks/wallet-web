import $api from "../api";
import {AxiosResponse} from "axios";
import {DashboardResponse} from "../models/responses/dashboard/dashboard-response.ts";

export default class StatisticsService {
  static async dashboard(): Promise<AxiosResponse<DashboardResponse>> {
    return $api.get<DashboardResponse>('/dashboard')
  }
}
