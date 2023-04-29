import BlockHeader from "../../components/page-struct/block-header.tsx";
import PlusButton from "../../components/buttons/plus.tsx";
import GrayInfoMessage from "../../components/info-messages/gray-info-message.tsx";
import TransactionsTable from "../../components/transactions/table.tsx";
import {useEffect, useState} from "react";
import {Transaction} from "../../models/transaction.ts";
import {PaginationMeta, StockPaginationMeta} from "../../models/pagination-meta.ts";
import TransactionsService from "../../services/TransactionsService.ts";
import {useLocation} from "react-router-dom";

export default function TransactionsList(): JSX.Element {
  const location = useLocation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>(StockPaginationMeta())

  const fetchTransactions = async (page: number) => {
    const response = await TransactionsService.list(page);
    setTransactions(response.data.data)
    setMeta(response.data.meta)
  }

  useEffect(() => {
    let page = 1;
    const queryPage = new URLSearchParams(location.search).get('page');
    if (queryPage && parseInt(queryPage) !== 1) page = parseInt(queryPage);

    fetchTransactions(page)
  }, [])

  useEffect(() => {
    const page = new URLSearchParams(location.search).get('page');
    if (page && parseInt(page) !== meta.current_page) {
      fetchTransactions(parseInt(page))
    }
  }, [location.search])

  return (
    <>
      <BlockHeader title="Все транзакции"
                   link={<PlusButton link="/transactions/add" />} />
      {meta.total === 0 &&<GrayInfoMessage message="У Вас пока нет транзакций." />}
      {meta.total > 0 &&<TransactionsTable paginate={meta} transactions={transactions} />}
    </>
  )
}
