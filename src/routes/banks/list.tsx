import BlockHeader from "../../components/page-struct/block-header.tsx";
import PlusButton from "../../components/buttons/plus.tsx";
import GrayInfoMessage from "../../components/info-messages/gray-info-message.tsx";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {PaginationMeta, StockPaginationMeta} from "../../models/pagination-meta.ts";
import Table from "../../components/page-struct/table.tsx";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {strLimit} from "../../functions.ts";
import {Bank} from "../../models/bank.ts";
import BanksService from "../../services/BanksService.ts";
import Loading from "../../components/loading.tsx";

export default function BanksList() {
  const location = useLocation();
  const [banks, setBanks] = useState<Bank[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta>(StockPaginationMeta())

  const fetchBanks = async (page: number) => {
    const response = await BanksService.list(page);
    setBanks(response.data.data)
    setMeta(response.data.meta)
  }

  useEffect(() => {
    let page = 1;
    const queryPage = new URLSearchParams(location.search).get('page');
    if (queryPage && parseInt(queryPage) !== 1) page = parseInt(queryPage);
    fetchBanks(page)
  }, [])

  useEffect(() => {
    const page = new URLSearchParams(location.search).get('page');
    if (page && parseInt(page) !== meta.current_page) {
      fetchBanks(parseInt(page))
    }
  }, [location.search])

  return (
    <>
      {banks === null &&<Loading />}
      {banks !== null &&<>
        <BlockHeader title="Все банки"
                       link={<PlusButton link="/banks/add" />} />
        {meta.total === 0 &&<GrayInfoMessage message="Банков пока нет." />}
          <Table paginate={meta}>
            {banks.map(bank => {
              return (
                <tr key={bank.id} className="font-medium flex flex-wrap lg:table-row border-b-2 md:border-b border-gray-200 md:border-gray-100">
                  <td className="px-5 md:px-5 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
                    {bank.id}
                  </td>
                  <td className="px-5 md:px-2 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
                    <div>{strLimit(bank.title, 20)}</div>
                  </td>
                  <td className="px-5 md:px-5 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
                    <div className="flex justify-end">
                      <Link to={`/banks/${bank.id}`}>
                        <PencilSquareIcon className="w-6 h-6 hover:text-blue-400 transition" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>
      </>}
    </>
  );
}