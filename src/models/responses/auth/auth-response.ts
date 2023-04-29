import {User} from "../../user.ts";

export type AuthResponse = {
  access_token: string;
  user: User;
};