import {CONSTANTS} from "../../constants.ts";
import {currencyFormat} from "../../functions.ts";

type CurrencyAmountProps = {
  amount: number;
  currency: string;
  type: CONSTANTS.REPLENISHMENT_TYPE|CONSTANTS.EXPENSE_TYPE;
};

export default function CurrencyAmount(props: CurrencyAmountProps) {
  return (
    <span className={`${props.type === CONSTANTS.REPLENISHMENT_TYPE ? 'text-emerald-500' : 'text-rose-500'}`}>
      {props.type === CONSTANTS.REPLENISHMENT_TYPE ? '+' : '-'}{currencyFormat(props.currency, props.amount)}
    </span>
  );
}