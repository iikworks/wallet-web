import {Subscription} from "../../models/subscription.ts";
import AccountDetails from "../accounts/account-details.tsx";
import {currencyFormat, declOfNum, strLimit} from "../../functions.ts";

type SubscriptionBlockProps = {
  subscription: Subscription;
};

export default function SubscriptionBlock(props: SubscriptionBlockProps) {
  const daysString = declOfNum(props.subscription.next_payment_in, ['день', 'дня', 'дней']);
  return (
    <div className="bg-gradient-to-r text-sm from-indigo-500 via-purple-500 to-pink-500 rounded-2xl py-3 px-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-200 text-base font-medium">
          {strLimit(props.subscription.organization.title, 20)}
        </div>
        <div className="text-gray-200 opacity-70">
          через {props.subscription.next_payment_in} {daysString}
        </div>
      </div>
      <div className="mt-2 flex leading-5 justify-between items-center">
        <div className="text-xs text-gray-200">
          <AccountDetails type={props.subscription.account.type} details={props.subscription.account.details} />
        </div>
        <div className="text-lg text-gray-200 text-base font-medium">
          {currencyFormat(props.subscription.currency, props.subscription.amount)}
        </div>
      </div>
    </div>
  );
}