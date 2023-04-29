import {Transaction} from "../../transaction.ts";
import {PaginationLinks, PaginationMeta} from "../../pagination-meta.ts";

export type TransactionsListResponse = {
  data: Transaction[];
  links: PaginationLinks;
  meta: PaginationMeta;
};