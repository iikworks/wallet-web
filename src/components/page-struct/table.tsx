import {ReactNode} from "react";
import {Link} from "react-router-dom";
import Pagination from "../pagination.tsx";
import {PaginationMeta} from "../../models/pagination-meta.ts";

type TableProps = {
  children: ReactNode;
  link?: {
    title: string;
    link: string;
  };
  paginate?: PaginationMeta;
};

export default function Table(props: TableProps) {
  return (
    <div className="relative bg-white rounded-xl overflow-x-auto">
      <table className="w-full text-left">
        <tbody>
          {props.children}
        </tbody>
      </table>
      {props.link &&<div className="flex justify-center py-2">
          <Link className="font-medium text-gray-500 hover:text-gray-700 transition"
                to={props.link.link}>{props.link.title}</Link>
      </div>}
      {props.paginate && props.paginate.last_page !== 1 &&<div className="py-3 px-4">
          <Pagination meta={props.paginate} />
      </div>}
    </div>
  );
}