import {PaginationMeta} from "../models/pagination-meta.ts";
import {Link} from "react-router-dom";

type PaginationProps = {
  meta: PaginationMeta;
};

export default function Pagination(props: PaginationProps) {
  const from = props.meta.per_page * props.meta.current_page - props.meta.per_page + 1;
  const links = [...props.meta.links];
  links.splice(0, 1);
  links.splice(links.length - 1, 1);

  return (
    <div>
      <div>Показано на странице: <span className="font-medium">{from}-{props.meta.to}</span> из <span className="font-medium">{props.meta.total}</span></div>
      <div className="flex justify-center my-2">
        <div className="flex gap-2">
          {links.map((link, index) => {
            return (
              <div key={index}>
                <Link to={!link.active && link.label !== '...' ? `?page=${link.label}` : '#'}
                      className={`bg-gray-200 py-1 px-2.5 rounded-xl font-medium ${!link.active && link.label !== '...' ? 'hover:bg-gray-300 transition' : 'opacity-50 cursor-default'}`}>
                  {link.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}