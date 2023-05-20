import BlockHeader from "../../components/page-struct/block-header.tsx";
import PlusButton from "../../components/buttons/plus.tsx";
import GrayInfoMessage from "../../components/info-messages/gray-info-message.tsx";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {PaginationMeta, StockPaginationMeta} from "../../models/pagination-meta.ts";
import {Organization} from "../../models/organization.ts";
import OrganizationsService from "../../services/OrganizationsService.ts";
import Table from "../../components/page-struct/table.tsx";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {strLimit} from "../../functions.ts";
import Loading from "../../components/loading.tsx";

export default function OrganizationsList() {
  const location = useLocation();
  const [organizations, setOrganizations] = useState<Organization[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta>(StockPaginationMeta())

  const fetchOrganizations = async (page: number) => {
    const response = await OrganizationsService.list(page);
    setOrganizations(response.data.data)
    setMeta(response.data.meta)
  }

  useEffect(() => {
    let page = 1;
    const queryPage = new URLSearchParams(location.search).get('page');
    if (queryPage && parseInt(queryPage) !== 1) page = parseInt(queryPage);
    fetchOrganizations(page)
  }, [])

  useEffect(() => {
    const page = new URLSearchParams(location.search).get('page');
    if (page && parseInt(page) !== meta.current_page) {
      fetchOrganizations(parseInt(page))
    }
  }, [location.search])

  return (
    <>
      {organizations === null &&<Loading />}
      {organizations !== null &&<>
        <BlockHeader title="Все организации"
                       link={<PlusButton link="/organizations/add" />} />
        {meta.total === 0 &&<GrayInfoMessage message="Организаций пока нет." />}
          <Table paginate={meta}>
            {organizations.map(organization => {
              return (
                <tr key={organization.id} className="font-medium flex flex-wrap text-sapling-dark-shade-2 lg:table-row border-b-2 md:border-b border-sapling">
                  <td className="px-5 md:px-5 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
                    {organization.id}
                  </td>
                  <td className="px-5 md:px-2 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
                    {organization.parent &&<div>
                        <span className="font-normal">Родитель:</span> <span className="font-medium">{strLimit(organization.parent.title, 15)}</span>
                    </div>}
                  </td>
                  <td className="px-5 md:px-2 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
                    <div>{strLimit(organization.title, 20)}</div>
                    <div className="font-normal text-sapling-dark-shade-1">{strLimit(organization.vulgar_title, 20)}</div>
                  </td>
                  <td className="px-5 md:px-5 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
                    <div className="flex justify-end">
                      <Link to={`/organizations/${organization.id}`}>
                        <PencilSquareIcon className="w-6 h-6 hover:text-sapling-dark-shade-1 transition" />
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