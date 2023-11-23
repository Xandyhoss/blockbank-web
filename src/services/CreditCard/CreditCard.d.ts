interface CreditCard {
  "@assetType": "creditCard";
  "@key": string;
  creditCardName: string;
  limit: number;
  limitUsed: number;
  number: string;
  owner: Holder;
}

interface CreditCardPurchase {
  "@assetType": "creditCardPurchase";
  "@key": string;
  creditCard: CreditCard;
  date: string;
  description: string;
  txId: string;
  value: number;
}

interface CreditCardPayment {
  "@assetType": "invoicePayment";
  "@key": string;
  creditCard: CreditCard;
  date: string;
  owner: Holder;
  txId: string;
  value: number;
}

interface PayInvoicePayload {
  creditCardKey: string;
  value: number;
}

interface CreateCreditCardPurchasePayload {
  creditCardKey: string;
  description: string;
  value: number;
}

interface CreateCreditCardPayload {
  creditCardName: string;
}

interface ActivateCreditCardPayload {
  holderKey: string;
}
