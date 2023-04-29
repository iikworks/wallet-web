import {Account} from "../../models/account.ts";
import {CONSTANTS} from "../../constants.ts";
import AccountDetails from "./account-details.tsx";
import {currencyFormat} from "../../functions.ts";

type AccountBlockProps = {
  account: Account;
};

export default function AccountBlock(props: AccountBlockProps) {
  return (
    <div className="bg-white text-sm rounded-2xl h-28 py-3 px-5">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="text-gray-500 text-base font-medium">
            {props.account.type === CONSTANTS.ACCOUNT_CASH_TYPE &&<>Наличные</>}
            {props.account.type === CONSTANTS.ACCOUNT_CARD_TYPE &&<>Карта</>}
            {props.account.type === CONSTANTS.ACCOUNT_BANK_ACCOUNT_TYPE &&<>Банковский счёт</>}
          </div>
          <div className="flex leading-5 justify-between items-center">
            <div className="text-lg text-gray-700 font-medium">
              {currencyFormat(props.account.currency, props.account.balance)}
            </div>
          </div>
        </div>
        <div className="text-xs mt-5 text-gray-500">
          <AccountDetails type={props.account.type} details={props.account.details} />
        </div>
      </div>
    </div>
  );
}