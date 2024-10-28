export const idlFactory = ({ IDL }) => {
  const MeMeCoinInfo = IDL.Record({
    'token_symbol' : IDL.Text,
    'name' : IDL.Text,
    'canister_id' : IDL.Text,
    'description' : IDL.Text,
    'create_time' : IDL.Int,
    'image' : IDL.Text,
  });
  const importTokenResult = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const MintLog = IDL.Record({
    'msg' : IDL.Text,
    'startTime' : IDL.Int,
    'endTime' : IDL.Int,
  });
  const X = IDL.Service({
    'add_controller' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'add_meme_info' : IDL.Func([MeMeCoinInfo], [IDL.Text], []),
    'add_reinstall' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8), IDL.Text],
        [IDL.Text],
        [],
      ),
    'back_icp' : IDL.Func([], [], []),
    'balance' : IDL.Func(
        [],
        [IDL.Record({ 'cycles_bance' : IDL.Nat, 'icp_balance' : IDL.Nat })],
        [],
      ),
    'clean_mint_logs' : IDL.Func([], [IDL.Text], []),
    'delete_canister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'delete_canisters' : IDL.Func([IDL.Text], [IDL.Text], []),
    'get_wallet_address' : IDL.Func([], [IDL.Text], []),
    'import_icpesx_token' : IDL.Func(
        [IDL.Text, IDL.Text],
        [importTokenResult],
        [],
      ),
    'mint' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'query_ransaction_curve' : IDL.Func([], [IDL.Text], []),
    'query_result' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], []),
    'showMintLogs' : IDL.Func([], [IDL.Vec(MintLog)], ['query']),
    'show_all_meme' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, MeMeCoinInfo))],
        [],
      ),
    'show_log' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
  });
  return X;
};
export const init = ({ IDL }) => { return []; };
