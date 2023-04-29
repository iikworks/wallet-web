import {Account} from "../../account.ts";
import {Transaction} from "../../transaction.ts";
import {Subscription} from "../../subscription.ts";

export type DashboardResponse = {
  data: {
    has_other_currencies: boolean;
    accounts: {
      list: Account[];
      count: number;
    };
    transactions: {
      latest: Transaction[];
      latest_first: Transaction;
      count: number;
      sum_expenses_at_this_month: number;
      sum_replenishments_at_this_month: number;
    };
    subscriptions: {
      list: Subscription[];
      count: number;
    };
  };
};