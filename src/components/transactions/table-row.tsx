import {Transaction} from "../../models/transaction.ts";
import AccountDetails from "../accounts/account-details.tsx";
import CurrencyAmount from "../currency/amount.tsx";
import moment from 'moment'

type TableRowProps = {
  transaction: Transaction;
};

export default function TransactionTableRow(props: TableRowProps) {
  return (
    <tr className="font-medium flex flex-wrap lg:table-row border-b-2 md:border-b border-gray-200 md:border-gray-100">
      <td className="px-5 md:px-4 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
        <div>
          {moment(props.transaction.date).format('DD.MM.YYYY')}
        </div>
        <div className="leading-4 text-gray-500">
          {moment(props.transaction.date).format('HH:mm')}
        </div>
      </td>
      <td className="px-5 md:px-5 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
        <div>{props.transaction.organization.title}</div>
        <div className="leading-4 text-gray-500">
          {props.transaction.organization.vulgar_title}
        </div>
      </td>
      <td className="px-5 md:px-6 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4">
        <AccountDetails type={props.transaction.account.type}
                        details={props.transaction.account.details} />
      </td>
      <td className="px-5 md:px-7 py-3 md:py-3 w-full md:w-1/2 lg:w-1/4 text-base">
                        <span className=" text-red-500 ">
                            <CurrencyAmount amount={props.transaction.amount}
                                            currency={props.transaction.account.currency}
                                            type={props.transaction.type} />
                        </span>
      </td>
    </tr>
  );
}