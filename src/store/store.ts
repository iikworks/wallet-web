import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import {User} from "../models/user.ts";
import {RegisterRequest} from "../models/requests/auth/register.ts";

export default class Store {
  user: User = {} as User;
  isAuth = false;
  checkAuthLoading = true;

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setCheckAuthLoading(bool: boolean) {
    this.checkAuthLoading = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  async login(phone: string, password: string) {
    const response = await AuthService.login(
      phone,
      password
    );
    localStorage.setItem("token", response.data.access_token);
    this.setAuth(true);
    this.setUser(response.data.user);
  }

  async logout() {
    try {
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as User);
    } catch (e: any) { /* empty */ }
  }

  async register(request: RegisterRequest) {
    const response = await AuthService.register(
      request,
    );
    localStorage.setItem("token", response.data.access_token);
    this.setAuth(true);
    this.setUser(response.data.user);
  }

  async UpdateUser() {
    try {
      const response = await AuthService.getUser();
      this.setUser(response.data.data);
    } catch (e: any) {}
  }

  async CheckAuth() {
    if(!localStorage.getItem("token")) {
      this.setCheckAuthLoading(false)
      return;
    }

    try {
      const response = await AuthService.getUser();

      this.setAuth(true);
      this.setUser(response.data.data);
      this.setCheckAuthLoading(false)
    } catch (e: any) {
      this.setCheckAuthLoading(false)
    }
  }
}
