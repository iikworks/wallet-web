import {PaginationLinks, PaginationMeta} from "../../pagination-meta.ts";
import {Bank} from "../../bank.ts";

export type BanksListResponse = {
  data: Bank[];
  links: PaginationLinks;
  meta: PaginationMeta;
};