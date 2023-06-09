import {Subscription} from "../../models/subscription.ts";
import AccountDetails from "../accounts/account-details.tsx";
import {currencyFormat, declOfNum, strLimit} from "../../functions.ts";

type SubscriptionBlockProps = {
  subscription: Subscription;
};

export default function SubscriptionBlock(props: SubscriptionBlockProps) {
  const daysString = declOfNum(props.subscription.next_payment_in, ['день', 'дня', 'дней']);
  return (
    <div className="bg-white rounded-xl py-3 px-4 hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <div className="text-base">
          {strLimit(props.subscription.organization.title, 20)}
        </div>
        <div className="text-gray-500 opacity-70">
          {props.subscription.next_payment_in > 2 &&<>через {props.subscription.next_payment_in} {daysString}</>}
          {props.subscription.next_payment_in === 2 &&<>послезавтра</>}
          {props.subscription.next_payment_in === 1 &&<>завтра</>}
          {props.subscription.next_payment_in === 0 &&<>сегодня</>}
        </div>
      </div>
      <div className="mt-2 flex leading-5 justify-between items-center">
        <div className="text-sm text-gray-700">
          <AccountDetails type={props.subscription.account.type} details={props.subscription.account.details} />
        </div>
        <div className="text-xl font-medium">
          {currencyFormat(props.subscription.currency, props.subscription.amount)}
        </div>
      </div>
    </div>
  );
}