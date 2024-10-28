import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface MeMeCoinInfo {
  'token_symbol' : string,
  'name' : string,
  'canister_id' : string,
  'description' : string,
  'create_time' : bigint,
  'image' : string,
}
export interface MintLog {
  'msg' : string,
  'startTime' : bigint,
  'endTime' : bigint,
}
export interface X {
  'add_controller' : ActorMethod<[string, string], string>,
  'add_meme_info' : ActorMethod<[MeMeCoinInfo], string>,
  'add_reinstall' : ActorMethod<
    [Uint8Array | number[], Uint8Array | number[], string],
    string
  >,
  'back_icp' : ActorMethod<[], undefined>,
  'balance' : ActorMethod<
    [],
    { 'cycles_bance' : bigint, 'icp_balance' : bigint }
  >,
  'clean_mint_logs' : ActorMethod<[], string>,
  'delete_canister' : ActorMethod<[string], string>,
  'delete_canisters' : ActorMethod<[string], string>,
  'get_wallet_address' : ActorMethod<[], string>,
  'import_icpesx_token' : ActorMethod<[string, string], importTokenResult>,
  'mint' : ActorMethod<
    [string, string, string, bigint, string, string, string],
    string
  >,
  'query_ransaction_curve' : ActorMethod<[], string>,
  'query_result' : ActorMethod<[string], [] | [string]>,
  'showMintLogs' : ActorMethod<[], Array<MintLog>>,
  'show_all_meme' : ActorMethod<[], Array<[string, MeMeCoinInfo]>>,
  'show_log' : ActorMethod<[], Array<string>>,
}
export type importTokenResult = { 'Ok' : null } |
  { 'Err' : string };
export interface _SERVICE extends X {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
