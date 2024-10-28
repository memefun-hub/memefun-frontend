import { HttpAgent } from '@dfinity/agent';

export const APP_ENV = process.env.APP_ENV!;
export const ICP_HOST = process.env.ICP_HOST!;
export const MEME_CANISTER_ID = process.env.MEME_CANISTER_ID!;
export const LEDGER_CANISTER_ID = process.env.LEDGER_CANISTER_ID!;

export const defaultAgent = new HttpAgent({ host: ICP_HOST });
