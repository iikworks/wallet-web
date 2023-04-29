import BlockHeader from "../../components/page-struct/block-header.tsx";
import PlusButton from "../../components/buttons/plus.tsx";
import GrayInfoMessage from "../../components/info-messages/gray-info-message.tsx";
import {useEffect, useState} from "react";
import {PaginationMeta, StockPaginationMeta} from "../../models/pagination-meta.ts";
import {useLocation} from "react-router-dom";
import {Subscription} from "../../models/subscription.ts";
import SubscriptionsService from "../../services/SubscriptionsService.ts";
import SubscriptionBlock from "../../components/subscriptions/subscription-block.tsx";
import ThreeGridBlock from "../../components/page-struct/three-grid-block.tsx";
import Pagination from "../../components/pagination.tsx";

export default function SubscriptionsList(): JSX.Element {
  const location = useLocation();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>(StockPaginationMeta())

  const fetchSubscriptions = async (page: number) => {
    const response = await SubscriptionsService.list(page);
    setSubscriptions(response.data.data)
    setMeta(response.data.meta)
  }

  useEffect(() => {
    fetchSubscriptions(1)
  }, [])

  useEffect(() => {
    const page = new URLSearchParams(location.search).get('page');
    if (page && parseInt(page) !== meta.current_page) {
      fetchSubscriptions(parseInt(page))
    }
  }, [location.search])

  return (
    <>
      <BlockHeader title="Все подписки"
                   link={<PlusButton link="/subscriptions/add" />} />
      {meta.total === 0 &&<GrayInfoMessage message="У Вас пока нет подписок." />}
      <ThreeGridBlock>
        {subscriptions.map(subscription => {
          return (
            <SubscriptionBlock key={subscription.id} subscription={subscription} />
          );
        })}
      </ThreeGridBlock>
      {meta.last_page > 1 &&<div className="bg-white rounded-2xl py-3 px-4 mt-3">
        <Pagination meta={meta} />
      </div>}
    </>
  )
}
