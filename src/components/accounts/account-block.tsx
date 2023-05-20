import {Account} from "../../models/account.ts";
import {CONSTANTS} from "../../constants.ts";
import AccountDetails from "./account-details.tsx";
import {currencyFormat} from "../../functions.ts";

type AccountBlockProps = {
  account: Account;
};

export default function AccountBlock(props: AccountBlockProps) {
  return (
    <div className="bg-east-bay-light-shade rounded-xl h-28 hover:scale-105 transition py-3 px-5">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="text-gray-300 font-medium">
            {props.account.type === CONSTANTS.ACCOUNT_CASH_TYPE &&<>Наличные</>}
            {props.account.type === CONSTANTS.ACCOUNT_CARD_TYPE &&<>Карта</>}
            {props.account.type === CONSTANTS.ACCOUNT_BANK_ACCOUNT_TYPE &&<>Банковский счёт</>}
          </div>
          <div className="flex leading-5 justify-between items-center">
            <div className="text-xl font-medium text-gray-200">
              {currencyFormat(props.account.currency, props.account.balance)}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-200 mt-5">
          <AccountDetails type={props.account.type} details={props.account.details} />
        </div>
      </div>
    </div>
  );
}