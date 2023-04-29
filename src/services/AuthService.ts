import $api from "../api";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/responses/auth/auth-response.ts";
import {RegisterRequest} from "../models/requests/auth/register.ts";
import {UserResponse} from "../models/responses/users/user.ts";

export default class AuthService {
  static async login(phone: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', {phone, password})
  }
  static async register(request: RegisterRequest): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/register', request)
  }
  static async getUser(): Promise<AxiosResponse<UserResponse>> {
    return $api.get<UserResponse>('/auth/user')
  }
}
