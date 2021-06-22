export interface Event {
  transactionHash: string;
  blockNumber: number;
  topics: string[];
  address: string;
}

export interface TransferEvent extends Event {
  from: string;
  to: string;
  token: string;
}

export interface TrustEvent extends Event {
  tokenOwner: string;
  truster: string;
}
