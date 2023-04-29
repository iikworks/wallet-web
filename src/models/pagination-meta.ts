export type PaginationMetaLinks = {
  url: string|null;
  label: string;
  active: boolean;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string|null;
  next: string|null;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationMetaLinks[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export function StockPaginationMeta(): PaginationMeta {
  return {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [],
    path: "",
    per_page: 0,
    to: 0,
    total: 1,
  };
}