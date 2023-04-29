import {Bank} from "../bank.ts";

export type CardDetails = {
  number: string;
  holder: string;
  expires: string;
  system: string;
  bank: Bank;
};
