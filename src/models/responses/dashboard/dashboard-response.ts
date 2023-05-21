import {Account} from "../../account.ts";
import {MonthlyTransactionStatistic, Transaction} from "../../transaction.ts";
import {Subscription} from "../../subscription.ts";

export type ExchangeRate = {
  from: string;
  to: string;
  rate: number;
  updated_at: Date;
};

export type DashboardResponse = {
  data: {
    exchange_rates: ExchangeRate[];
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