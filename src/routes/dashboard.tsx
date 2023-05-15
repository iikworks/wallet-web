import Block from "../components/block.tsx";
import {useContext, useEffect, useState} from "react";
import StatisticsService from "../services/StatisticsService.ts";
import {DashboardResponse} from "../models/responses/dashboard/dashboard-response.ts";
import {Context} from "../main.tsx";
import CurrencyAmount from "../components/currency/amount.tsx";
import {CONSTANTS} from "../constants.ts";
import AccountBlock from "../components/accounts/account-block.tsx";
import SubscriptionBlock from "../components/subscriptions/subscription-block.tsx";
import BlockHeader from "../components/page-struct/block-header.tsx";
import PlusButton from "../components/buttons/plus.tsx";
import GoToAll from "../components/page-struct/go-to-all.tsx";
import TransactionsTable from "../components/transactions/table.tsx";
import {Account} from "../models/account.ts";
import {Organization} from "../models/organization.ts";
import GrayInfoMessage from "../components/info-messages/gray-info-message.tsx";
import ThreeGridBlock from "../components/page-struct/three-grid-block.tsx";
import {MonthlyBarChart} from "../components/statistic/MontlyBarChart.tsx";

export default function Dashboard(): JSX.Element {
  const [statistics, setStatistics] = useState<DashboardResponse>({
    data: {
      has_other_currencies: false,
      accounts: {
        list: [],
        count: 0,
      },
      transactions: {
        latest: [],
        latest_first: {
          id: 0,
          account: {} as Account,
          organization: {} as Organization,
          type: CONSTANTS.REPLENISHMENT_TYPE,
          amount: 0,
          date: new Date,
          created_at: new Date,
        },
        sum_replenishments_at_this_month: 0,
        sum_expenses_at_this_month: 0,
        count: 0,
        statistics_by_month: [],
      },
      subscriptions: {
        list: [],
        count: 0,
      },
    }
  })
  const { store } = useContext(Context);

  const fetchDashboard = async () => {
    const response = await StatisticsService.dashboard();
    setStatistics(response.data);
  }

  useEffect(() => {
    fetchDashboard();
  }, [])

  return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Block>
            <div className="text-gray-600">Последняя транзакция</div>
            <div className="text-lg font-medium leading-5">
              <CurrencyAmount currency={statistics.data.transactions.latest_first.account.currency}
                              type={statistics.data.transactions.latest_first.type}
                              amount={statistics.data.transactions.latest_first.amount} />
            </div>
          </Block>
          <Block>
            <div className="text-gray-600">Расход за этот месяц</div>
            <div className="text-lg font-medium leading-5">
                <CurrencyAmount currency={store.user.currency}
                                type={CONSTANTS.EXPENSE_TYPE}
                                amount={statistics.data.transactions.sum_expenses_at_this_month} />
            </div>
          </Block>
          <Block>
            <div className="text-gray-600">Приход за этот месяц</div>
            <div className="text-lg font-medium leading-5">
                <CurrencyAmount currency={store.user.currency}
                                type={CONSTANTS.REPLENISHMENT_TYPE}
                                amount={statistics.data.transactions.sum_replenishments_at_this_month}/>
            </div>
          </Block>
        </div>
        <BlockHeader title="Сумма операций по месяцам"
                     classes="mt-7" />
        <Block>
          <div className="max-h-72">
            <MonthlyBarChart statistics={statistics.data.transactions.statistics_by_month} />
          </div>
        </Block>
        <BlockHeader title="Счета"
                     classes="mt-7"
                     link={<PlusButton link="/accounts/add" />} />
        <ThreeGridBlock>
          {statistics.data.accounts.list.map(account => {
            return (
              <AccountBlock key={account.id} account={account} />
            );
          })}
        </ThreeGridBlock>
        {statistics.data.accounts.count === 0 &&<GrayInfoMessage message="У Вас пока нет счетов." />}
        {statistics.data.accounts.count > 3 &&<GoToAll title="Все счета" link="/accounts" />}
        <BlockHeader title="Подписки"
                     classes="mt-7"
                     link={<PlusButton link="/subscriptions/add" />} />
        <ThreeGridBlock>
          {statistics.data.subscriptions.list.map(subscription => {
            return (
              <SubscriptionBlock key={subscription.id} subscription={subscription} />
            );
          })}
        </ThreeGridBlock>
        {statistics.data.subscriptions.count === 0 &&<GrayInfoMessage message="У Вас пока нет подписок." />}
        {statistics.data.subscriptions.count > 3 &&<GoToAll title="Все подписки" link="/subscriptions" />}
        <BlockHeader title="Последние транзакции"
                     classes="mt-7"
                     link={<PlusButton link="/transactions/add" />} />
        {statistics.data.transactions.count === 0 &&<GrayInfoMessage message="У Вас пока нет транзакций." />}
        {statistics.data.transactions.count > 0 &&<TransactionsTable transactions={statistics.data.transactions.latest}
                           link={statistics.data.transactions.count > 10 ? {
                             link: '/transactions',
                             title: 'Все транзакции'
                           } : undefined}/>}
      </>
  )
}
