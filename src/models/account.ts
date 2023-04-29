import {User} from "./user.ts";
import {BankDetails} from "./account/bank-details.ts";
import {CardDetails} from "./account/card-details.ts";
import {CONSTANTS} from "../constants.ts";

export type Account = {
  id: number;
  user: User;
  currency: string;
  balance: number;
  type: CONSTANTS.ACCOUNT_CASH_TYPE|CONSTANTS.ACCOUNT_BANK_ACCOUNT_TYPE|CONSTANTS.ACCOUNT_CARD_TYPE;
  details: null|BankDetails|CardDetails;
  created_at: Date;
};
