import {Organization} from "./models/organization.ts";
import {SelectOptionValue} from "./components/inputs/select.tsx";
import {Account} from "./models/account.ts";
import {CONSTANTS} from "./constants.ts";
import {Currency} from "./models/currency.ts";

export function strLimit(string: string, limit: number) {
  if (string.length > limit) return string.substring(0, limit) + '...';

  return string;
}

export function declOfNum(number: number, titles: string[]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
    ];
}

export function currencyFormat(currency: string, number: number): string {
  const toLocaleStringOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (currency === 'BYN') return `${number.toLocaleString('ru-RU', toLocaleStringOptions)} BYN`
  if (currency === 'USD') return `$${number.toLocaleString('ru-RU', toLocaleStringOptions)}`

  return '';
}

export function convertOrganizationsToOptionsRecursive (organizations: Organization[], withNone = false): SelectOptionValue[] {
  const options: SelectOptionValue[] = [];

  if(withNone) options.push({
    value: '0',
    title: ``,
    subtitle: 'нет',
    children: [],
  })

  for (let i = 0; i < organizations.length; i++) {
    options.push({
      value: `${organizations[i].id}`,
      title: organizations[i].title,
      subtitle: organizations[i].vulgar_title,
      children: convertOrganizationsToOptionsRecursive(organizations[i].children),
    })
  }

  return options;
}

export function convertAccountsToOptions(accounts: Account[]): SelectOptionValue[] {
  const options: SelectOptionValue[] = [];

  for (let i = 0; i < accounts.length; i++) {
    let title = 'Наличные';
    if (accounts[i].type === CONSTANTS.ACCOUNT_CARD_TYPE) title = `Карта ${accounts[i].details?.number}`
    if (accounts[i].type === CONSTANTS.ACCOUNT_BANK_ACCOUNT_TYPE) title = `Счёт ${accounts[i].details?.number}`

    options.push({
      value: `${accounts[i].id}`,
      title: title,
      subtitle: currencyFormat(accounts[i].currency, accounts[i].balance),
      children: [],
    })
  }

  return options;
}

export function convertCurrenciesToOptions(currencies: Currency[]): SelectOptionValue[] {
  const options: SelectOptionValue[] = [];

  for (let i = 0; i < currencies.length; i++) {
    options.push({
      value: currencies[i].code,
      title: currencies[i].title,
      subtitle: currencies[i].code,
      children: [],
    })
  }

  return options;
}

export function getTransactionTypesSelectOptions(): SelectOptionValue[] {
  return [
    {
      value: CONSTANTS.EXPENSE_TYPE,
      title: 'Списание',
      subtitle: '',
      children: [],
    }, {
      value: CONSTANTS.REPLENISHMENT_TYPE,
      title: 'Пополнение',
      subtitle: '',
      children: [],
    },
  ];
}