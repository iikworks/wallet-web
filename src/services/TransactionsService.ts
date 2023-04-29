import $api from "../api";
import {AxiosResponse} from "axios";
import {
  TransactionsListResponse,
} from "../models/responses/transactions/transactions-response.ts";
import {TransactionResponse} from "../models/responses/transactions/transaction-response.ts";
import {TransactionsFormParams} from "../components/transactions/form.tsx";

export default class TransactionsService {
  static async store(form: TransactionsFormParams): Promise<AxiosResponse<TransactionResponse>> {
    return $api.post<TransactionResponse>('/transactions', form)
  }

  static async list(page: number): Promise<AxiosResponse<TransactionsListResponse>> {
    return $api.get<TransactionsListResponse>(`/transactions?page=${page}`)
  }
}
