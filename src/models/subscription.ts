import {Account} from "./account.ts";
import {Organization} from "./organization.ts";

export type Subscription = {
  id: number;
  account: Account;
  organization: Organization;
  amount: number;
  currency: string;
  day: number;
  next_payment_in: number;
  created_at: Date;
};
