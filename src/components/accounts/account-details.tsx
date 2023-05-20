import {CONSTANTS} from "../../constants.ts";
import {CardDetails} from "../../models/account/card-details.ts";
import {BankDetails} from "../../models/account/bank-details.ts";
import {strLimit} from "../../functions.ts";

type AccountDetailsProps = {
  type: CONSTANTS.ACCOUNT_CASH_TYPE|CONSTANTS.ACCOUNT_BANK_ACCOUNT_TYPE|CONSTANTS.ACCOUNT_CARD_TYPE;
  details: null|CardDetails|BankDetails;
};

export default function AccountDetails(props: AccountDetailsProps) {
  return (
    <div className="font-medium">
      {props.type === CONSTANTS.ACCOUNT_CASH_TYPE &&<div>
        Наличные
      </div>}
      {props.type === CONSTANTS.ACCOUNT_BANK_ACCOUNT_TYPE &&<>
          <div>
            Счёт
              <span className="ml-1 text-wild-blue">{props.details?.number}</span>
          </div>
          <div className="leading-4 opacity-60">
            {props.details?.bank ? strLimit(props.details.bank.title, 20) : ''}
          </div>
      </>}
      {props.type === CONSTANTS.ACCOUNT_CARD_TYPE &&<>
          <div>
              Карта
              <span className="ml-1 text-wild-blue-light-shade">{props.details?.number}</span>
          </div>
          <div className="leading-4 opacity-60">
            {props.details?.bank ? strLimit(props.details.bank.title, 20) : ''}
          </div>
      </>}
    </div>
  );
}