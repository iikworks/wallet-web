import {Account} from "../../account.ts";
import {MonthlyTransactionStatistic, Transaction} from "../../transaction.ts";
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
      statistics_by_month: MonthlyTransactionStatistic[],
    };
    subscriptions: {
      list: Subscription[];
      count: number;
    };
  };
};