import {Account} from "./account.ts";
import {Organization} from "./organization.ts";
import {CONSTANTS} from "../constants.ts";

export type Transaction = {
  id: number;
  account: Account;
  organization: Organization;
  type: CONSTANTS.REPLENISHMENT_TYPE|CONSTANTS.EXPENSE_TYPE;
  amount: number;
  date: Date;
  created_at: Date;
};
