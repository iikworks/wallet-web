import {PaginationLinks, PaginationMeta} from "../../pagination-meta.ts";
import {Account} from "../../account.ts";

export type AccountsListResponse = {
  data: Account[];
  links: PaginationLinks;
  meta: PaginationMeta;
};