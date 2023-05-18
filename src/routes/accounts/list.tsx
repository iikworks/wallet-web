import BlockHeader from "../../components/page-struct/block-header.tsx";
import PlusButton from "../../components/buttons/plus.tsx";
import GrayInfoMessage from "../../components/info-messages/gray-info-message.tsx";
import {useEffect, useState} from "react";
import {PaginationMeta, StockPaginationMeta} from "../../models/pagination-meta.ts";
import {useLocation} from "react-router-dom";
import ThreeGridBlock from "../../components/page-struct/three-grid-block.tsx";
import Pagination from "../../components/pagination.tsx";
import {Account} from "../../models/account.ts";
import AccountsService from "../../services/AccountsService.ts";
import AccountBlock from "../../components/accounts/account-block.tsx";
import Loading from "../../components/loading.tsx";

export default function AccountsList(): JSX.Element {
  const location = useLocation();
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta>(StockPaginationMeta())

  const fetchAccounts = async (page: number) => {
    const response = await AccountsService.list(page);
    setAccounts(response.data.data)
    setMeta(response.data.meta)
  }

  useEffect(() => {
    fetchAccounts(1)
  }, [])

  useEffect(() => {
    const page = new URLSearchParams(location.search).get('page');
    if (page && parseInt(page) !== meta.current_page) {
      fetchAccounts(parseInt(page))
    }
  }, [location.search])

  return (
    <>
      {accounts === null &&<Loading />}
      {accounts !== null &&<>
        <BlockHeader title="Все счета"
                       link={<PlusButton link="/accounts/add" />} />
        {meta.total === 0 &&<GrayInfoMessage message="У Вас пока нет счетов." />}
          <ThreeGridBlock>
            {accounts.map(account => {
              return (
                <AccountBlock key={account.id} account={account} />
              );
            })}
          </ThreeGridBlock>
        {meta.last_page > 1 &&<div className="bg-white rounded-2xl py-3 px-4 mt-3">
            <Pagination meta={meta} />
        </div>}
      </>}
    </>
  )
}
