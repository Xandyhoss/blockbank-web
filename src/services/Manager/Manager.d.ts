interface Holder {
  "@assetType": "holder";
  "@key": string;
  cash: number;
  ccAvailable: boolean;
  document: string;
  name: string;
}

interface CreateManagerPayload {
  username: string;
  password: string;
  name: string;
  document: string;
}
