import { APP_ENV, defaultAgent, MEME_CANISTER_ID } from '@/actor/index';
import { Config } from '@/constants';
import { Actor, HttpAgent } from '@dfinity/agent';
import { _SERVICE as MEME_ICRC2_SERVICE } from '@/declarations/meme/meme.did';
// @ts-ignore
import { idlFactory as memeIcrc2Interface } from '@/declarations/meme/meme.did.js';
import BigNumber from 'bignumber.js';

export async function show_detail_info(memeCanisterId: string) {
  const agent = defaultAgent;

  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();

  const memeActor = Actor.createActor<MEME_ICRC2_SERVICE>(memeIcrc2Interface, {
    agent: agent,
    canisterId: memeCanisterId,
  });
  return await memeActor!.show_detail_info();
}

export async function show_all_icp_transaction_logs(memeCanisterId: string) {
  const agent = defaultAgent;

  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();

  const memeActor = Actor.createActor<MEME_ICRC2_SERVICE>(memeIcrc2Interface, {
    agent: agent,
    canisterId: memeCanisterId,
  });
  return await memeActor!.show_all_icp_transaction_logs();
}

export async function buyMeme(agent: HttpAgent, uuid: string, canisterId: string, amount: number) {
  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();

  const memeActor = Actor.createActor<MEME_ICRC2_SERVICE>(memeIcrc2Interface, {
    agent: agent,
    canisterId: canisterId,
  });

  const amountBig = new BigNumber(amount);
  const amountInBigInt = amountBig.multipliedBy(10 ** 8).toFixed(0);

  return await memeActor!.buy(BigInt(amountInBigInt), uuid);
}

export async function sellMeme(agent: HttpAgent, uuid: string, canisterId: string, amount: number) {
  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();

  const memeActor = Actor.createActor<MEME_ICRC2_SERVICE>(memeIcrc2Interface, {
    agent: agent,
    canisterId: canisterId,
  });

  const amountBig = new BigNumber(amount);
  const amountInBigInt = amountBig.multipliedBy(10 ** 8).toFixed(0);

  return await memeActor!.sell(BigInt(amountInBigInt), uuid);
}

export async function queryTimeoutResult(uuid: string, canisterId: string) {
  const agent = defaultAgent;

  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();

  const memeActor = Actor.createActor<MEME_ICRC2_SERVICE>(memeIcrc2Interface, {
    agent: agent,
    canisterId: canisterId,
  });
  return await memeActor!.query_result(uuid);
}
