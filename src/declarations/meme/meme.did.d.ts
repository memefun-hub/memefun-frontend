import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Subaccount],
}
export interface Account__1 {
  'owner' : Principal,
  'subaccount' : [] | [Subaccount],
}
export type ApproveError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'BadFee' : { 'expected_fee' : bigint } } |
  { 'AllowanceChanged' : { 'current_allowance' : bigint } } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'Expired' : { 'ledger_time' : bigint } } |
  { 'InsufficientFunds' : { 'balance' : bigint } };
export type ApproveResult = { 'Ok' : Tokens__1 } |
  { 'Err' : ApproveError };
export type BlockIndex = bigint;
export interface ICPTransaction {
  'to' : string,
  'fee' : bigint,
  'icp_chain_index' : bigint,
  'from' : string,
  'timestamp' : Timestamp,
  'amount' : bigint,
  'usdt_amount' : bigint,
}
export interface MeMeCoin {
  'back_icp' : ActorMethod<[], undefined>,
  'buy' : ActorMethod<[bigint, string], TransferResult>,
  'create_account' : ActorMethod<[], string>,
  'cycleBalance' : ActorMethod<[], bigint>,
  'destroy' : ActorMethod<
    [
      {
        'fee' : [] | [Tokens],
        'memo' : [] | [Memo],
        'user' : Account__1,
        'created_at_time' : [] | [Timestamp__1],
        'amount' : Tokens,
      },
    ],
    TransferResult__1
  >,
  'do_call_icpex' : ActorMethod<[], Result>,
  'do_call_icpex_approve' : ActorMethod<[bigint], Result>,
  'do_launch' : ActorMethod<[], string>,
  'get_address' : ActorMethod<[], string>,
  'get_icp_usd_price' : ActorMethod<[], number>,
  'get_real_icp_balance' : ActorMethod<[], bigint>,
  'icp_buy' : ActorMethod<[Principal, bigint], TransferResult>,
  'icp_sell' : ActorMethod<[Principal, bigint], TransferResult>,
  'icp_total_amount' : ActorMethod<[], bigint>,
  'icrc1_balance_of' : ActorMethod<[Account__1], Tokens>,
  'icrc1_decimals' : ActorMethod<[], number>,
  'icrc1_fee' : ActorMethod<[], bigint>,
  'icrc1_metadata' : ActorMethod<[], Array<[string, Value]>>,
  'icrc1_minting_account' : ActorMethod<[], [] | [Account__1]>,
  'icrc1_name' : ActorMethod<[], string>,
  'icrc1_supported_standards' : ActorMethod<
    [],
    Array<{ 'url' : string, 'name' : string }>
  >,
  'icrc1_symbol' : ActorMethod<[], string>,
  'icrc1_total_supply' : ActorMethod<[], Tokens>,
  'icrc1_transfer' : ActorMethod<
    [
      {
        'to' : Account__1,
        'fee' : [] | [Tokens],
        'memo' : [] | [Memo],
        'from_subaccount' : [] | [Subaccount__1],
        'created_at_time' : [] | [Timestamp__1],
        'amount' : Tokens,
      },
    ],
    TransferResult__1
  >,
  'icrc2_allowance' : ActorMethod<
    [{ 'account' : Account__1, 'spender' : Principal }],
    Tokens__1
  >,
  'icrc2_approve' : ActorMethod<
    [
      {
        'fee' : [] | [Tokens],
        'memo' : [] | [Memo],
        'from_subaccount' : [] | [Subaccount__1],
        'created_at_time' : [] | [Timestamp__1],
        'amount' : Tokens,
        'spender' : Account,
      },
    ],
    ApproveResult
  >,
  'icrc2_transfer_from' : ActorMethod<
    [
      {
        'to' : Account,
        'fee' : [] | [Tokens],
        'spender_subaccount' : [] | [Subaccount__1],
        'from' : Account,
        'memo' : [] | [Memo],
        'created_at_time' : [] | [Timestamp__1],
        'amount' : Tokens,
      },
    ],
    TransferFromResult
  >,
  'init_main_balance' : ActorMethod<[], undefined>,
  'launch_able' : ActorMethod<[], boolean>,
  'main_balance_show' : ActorMethod<[], UserBalanceShow>,
  'meme_total_amount' : ActorMethod<[], Tokens>,
  'query_call_icpex_log' : ActorMethod<[], Array<string>>,
  'query_icp_count' : ActorMethod<[bigint, string], bigint>,
  'query_meme_count' : ActorMethod<[bigint, string], bigint>,
  'query_quxian_log' : ActorMethod<[], Array<string>>,
  'query_result' : ActorMethod<[string], [] | [TransferResult]>,
  'sell' : ActorMethod<[bigint, string], TransferResult>,
  'set_init_icp_amount' : ActorMethod<[bigint, string], bigint>,
  'show_all_icp_transaction_logs' : ActorMethod<[], Array<ICPTransaction>>,
  'show_balance_map' : ActorMethod<[], Array<[string, UserBalanceShow]>>,
  'show_cost_log' : ActorMethod<[], Array<string>>,
  'show_detail_info' : ActorMethod<
    [],
    {
      'market_info' : {
        'market_cap' : bigint,
        'mobility' : bigint,
        'one_day_trading_volume' : bigint,
        'current_price' : bigint,
      },
      'base_info' : {
        'token_symbol' : string,
        'logo' : string,
        'canister_id' : string,
        'create_account' : string,
        'launch' : boolean,
        'icpex_pool_canister_id' : string,
        'token_name' : string,
      },
    }
  >,
  'show_last_log' : ActorMethod<[], [] | [MeMeTransactionLog]>,
  'show_logs' : ActorMethod<[], Array<MeMeTransactionLog>>,
  'show_meme_transaction' : ActorMethod<[], Array<MeMeTransaction>>,
  'total_icp_transcation_amount' : ActorMethod<[], bigint>,
  'total_icp_transcation_one_day_amount' : ActorMethod<[], bigint>,
  'update_config' : ActorMethod<
    [[] | [bigint], [] | [bigint], [] | [bigint]],
    string
  >,
  'withdraw_all' : ActorMethod<[], string>,
}
export interface MeMeTransaction {
  'to' : [] | [Principal],
  'fee' : [] | [bigint],
  'from' : Principal,
  'memo' : [] | [Uint8Array | number[]],
  't_hash' : string,
  't_status' : MeMeTransactionStatus,
  't_type' : MeMeTransactionType,
  't_timestamp' : bigint,
  't_index' : bigint,
  'amount' : bigint,
  'spender_account' : [] | [Principal],
}
export interface MeMeTransactionLog {
  'to' : Principal,
  'from' : Principal,
  'usdt' : number,
  'meme_amount' : bigint,
  't_type' : MeMeTransactionType,
  'timestamp' : Timestamp,
  'icp_amount' : bigint,
  'index' : bigint,
}
export type MeMeTransactionStatus = { 'Error' : null } |
  { 'Complete' : null };
export type MeMeTransactionType = { 'Approve' : null } |
  { 'Burn' : null } |
  { 'Mint' : null } |
  { 'Transfer' : null };
export type Memo = Uint8Array | number[];
export type Result = { 'Ok' : bigint } |
  { 'Err' : string };
export type Subaccount = Uint8Array | number[];
export type Subaccount__1 = Uint8Array | number[];
export type Timestamp = bigint;
export type Timestamp__1 = bigint;
export type Tokens = bigint;
export type Tokens__1 = bigint;
export type TransferError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'BadBurn' : { 'min_burn_amount' : bigint } } |
  { 'Duplicate' : { 'duplicate_of' : BlockIndex } } |
  { 'BadFee' : { 'expected_fee' : bigint } } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : { 'balance' : bigint } };
export type TransferFromError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'InsufficientAllowance' : { 'allowance' : bigint } } |
  { 'BadBurn' : { 'min_burn_amount' : bigint } } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'BadFee' : { 'expected_fee' : bigint } } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : { 'balance' : bigint } };
export type TransferFromResult = { 'Ok' : bigint } |
  { 'Err' : TransferFromError };
export type TransferResult = { 'Ok' : BlockIndex } |
  { 'Err' : TransferError };
export type TransferResult__1 = { 'Ok' : BlockIndex } |
  { 'Err' : TransferError };
export interface UserBalanceShow {
  'account_id' : string,
  'principal' : [] | [Principal],
  'amount' : bigint,
}
export type Value = { 'Int' : bigint } |
  { 'Nat' : bigint } |
  { 'Blob' : Uint8Array | number[] } |
  { 'Text' : string };
export interface _SERVICE extends MeMeCoin {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
