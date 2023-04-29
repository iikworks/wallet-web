import {PaginationLinks, PaginationMeta} from "../../pagination-meta.ts";
import {Subscription} from "../../subscription.ts";

export type SubscriptionsListResponse = {
  data: Subscription[];
  links: PaginationLinks;
  meta: PaginationMeta;
};