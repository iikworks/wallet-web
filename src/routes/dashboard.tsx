import Block from "../components/block.tsx";
import {useEffect, useState} from "react";
import StatisticsService from "../services/StatisticsService.ts";
import {DashboardResponse} from "../models/responses/dashboard/dashboard-response.ts";
import CurrencyAmount from "../components/currency/amount.tsx";
import AccountBlock from "../components/accounts/account-block.tsx";
import SubscriptionBlock from "../components/subscriptions/subscription-block.tsx";
import BlockHeader from "../components/page-struct/block-header.tsx";
import PlusButton from "../components/buttons/plus.tsx";
import GoToAll from "../components/page-struct/go-to-all.tsx";
import TransactionsTable from "../components/transactions/table.tsx";
import GrayInfoMessage from "../components/info-messages/gray-info-message.tsx";
import ThreeGridBlock from "../components/page-struct/three-grid-block.tsx";
import {MonthlyBarChart} from "../components/statistic/MontlyBarChart.tsx";
import Loading from "../components/loading.tsx";
import {currencyFormat, declOfNum} from "../functions.ts";
import moment from "moment";

export default function Dashboard(): JSX.Element {
  const [statistics, setStatistics] = useState<DashboardResponse | null>(null)

  const fetchDashboard = async () => {
    const response = await StatisticsService.dashboard();
    setStatistics(response.data);
  }

  useEffect(() => {
    fetchDashboard();
  }, [])

  return (
      <>
        {statistics === null &&<Loading />}
        {statistics !== null &&<>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Block>
                    <div className="text-gray-200 font-medium">Последняя транзакция</div>
                    <div className="text-lg font-semibold leading-5">
                        <CurrencyAmount currency={statistics.data.transactions.latest_first.account.currency}
                                        type={statistics.data.transactions.latest_first.type}
                                        amount={statistics.data.transactions.latest_first.amount} />
                    </div>
                </Block>
            </div>
            <BlockHeader title="Курсы"
                         classes="mt-7" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {statistics.data.exchange_rates.map(exchangeRate => {
                const minutes = Math.abs(moment(exchangeRate.updated_at).diff(moment(), 'minute'))

                return (
                  <Block>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-200 font-medium">{exchangeRate.to}</div>
                      <div className="text-wild-blue-light-shade text-xs font-medium">
                        {minutes} {declOfNum(minutes, ['минуту', 'минуты', 'минут'])} назад
                      </div>
                    </div>
                    <div className="text-lg text-blue-400 font-semibold leading-5">
                      {currencyFormat(exchangeRate.from, exchangeRate.rate, 4)}
                    </div>
                  </Block>
                );
              })}
            </div>
            {statistics.data.transactions.statistics_by_month.length > 0 &&<>
              <BlockHeader title="Сумма операций по месяцам"
                           classes="mt-7" />
              <Block>
                <div className="max-h-72 text-gray-200">
                  <MonthlyBarChart statistics={statistics.data.transactions.statistics_by_month} />
                </div>
              </Block>
            </>}
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
        </>}
      </>
  )
}
