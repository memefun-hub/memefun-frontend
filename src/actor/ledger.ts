import { APP_ENV, defaultAgent, LEDGER_CANISTER_ID } from '@/actor/index';
import { Config } from '@/constants';
import { Principal } from '@dfinity/principal';
// @ts-ignore
import {
  ApproveArgs,
  idlFactory as ledgerInterface,
  TransferFromArgs,
} from '@/declarations/icrc1_ledger_canister/icrc1_ledger_canister.did.js';
import { _SERVICE as LEDGER_SERVICE } from '@/declarations/icrc1_ledger_canister/icrc1_ledger_canister.did';
import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Account } from '@dfinity/ledger-icp';
import BigNumber from 'bignumber.js';

export async function icrc2Approve(agent: HttpAgent, spender: string, amount: number) {
  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();
  // spender is approved
  console.log(amount);
  const amountBig = new BigNumber(amount);
  const amountInBigInt = amountBig.multipliedBy(10 ** 8).toFixed(0);

  const param: ApproveArgs = {
    created_at_time: [],
    expected_allowance: [],
    expires_at: [],
    fee: [],
    from_subaccount: [],
    memo: [],
    spender: {
      owner: Principal.fromText(spender),
      subaccount: [],
    },
    amount: BigInt(amountInBigInt),
  };
  console.log('approve start: ', param);

  const ledgerActor = Actor.createActor<LEDGER_SERVICE>(ledgerInterface, {
    agent: agent,
    canisterId: LEDGER_CANISTER_ID,
  });

  return await ledgerActor.icrc2_approve(param);
}

export async function icrc1_balance_of(agent: HttpAgent, principal: string, canisterId?: string) {
  if (canisterId === '' || canisterId === undefined) canisterId = LEDGER_CANISTER_ID;

  const ledgerActor = Actor.createActor<LEDGER_SERVICE>(ledgerInterface, {
    agent: agent,
    canisterId: canisterId,
  });

  const param: Account = {
    owner: Principal.fromText(principal),
    subaccount: [],
  };

  return await ledgerActor.icrc1_balance_of(param);
}

export async function icrc1_fee(agent: HttpAgent) {
  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();

  const ledgerActor = Actor.createActor<LEDGER_SERVICE>(ledgerInterface, {
    agent: agent,
    canisterId: LEDGER_CANISTER_ID,
  });

  return await ledgerActor.icrc1_fee();
}

export async function icrc1_symbol(canisterId?: string): Promise<string> {
  const agent = defaultAgent;
  if (canisterId === '' || canisterId === undefined) canisterId = LEDGER_CANISTER_ID;

  if (APP_ENV !== Config.MAINNET) agent.fetchRootKey();

  const ledgerActor = Actor.createActor<LEDGER_SERVICE>(ledgerInterface, {
    agent: agent,
    canisterId: canisterId,
  });

  return await ledgerActor.icrc1_symbol();
}
