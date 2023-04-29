import TransactionTableRow from "./table-row.tsx";
import {Transaction} from "../../models/transaction.ts";
import {PaginationMeta} from "../../models/pagination-meta.ts";
import Table from "../page-struct/table.tsx";

type TransactionsTableProps = {
  transactions: Transaction[];
  link?: {
    title: string;
    link: string;
  };
  paginate?: PaginationMeta;
};

export default function TransactionsTable(props: TransactionsTableProps) {
  return (
    <Table paginate={props.paginate} link={props.link}>
      {props.transactions.map(transaction => {
        return (
          <TransactionTableRow key={transaction.id} transaction={transaction} />
        );
      })}
    </Table>
  );
}