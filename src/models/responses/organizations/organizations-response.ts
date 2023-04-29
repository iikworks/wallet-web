import {PaginationLinks, PaginationMeta} from "../../pagination-meta.ts";
import {Organization} from "../../organization.ts";

export type OrganizationsListResponse = {
  data: Organization[];
  links: PaginationLinks;
  meta: PaginationMeta;
};