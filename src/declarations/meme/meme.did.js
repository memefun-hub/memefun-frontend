export const idlFactory = ({ IDL }) => {
  const BlockIndex = IDL.Nat;
  const TransferError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'TemporarilyUnavailable' : IDL.Null,
    'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : BlockIndex }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const TransferResult = IDL.Variant({
    'Ok' : BlockIndex,
    'Err' : TransferError,
  });
  const Tokens = IDL.Nat;
  const Memo = IDL.Vec(IDL.Nat8);
  const Subaccount = IDL.Vec(IDL.Nat8);
  const Account__1 = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(Subaccount),
  });
  const Timestamp__1 = IDL.Nat64;
  const TransferResult__1 = IDL.Variant({
    'Ok' : BlockIndex,
    'Err' : TransferError,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  const Value = IDL.Variant({
    'Int' : IDL.Int,
    'Nat' : IDL.Nat,
    'Blob' : IDL.Vec(IDL.Nat8),
    'Text' : IDL.Text,
  });
  const Subaccount__1 = IDL.Vec(IDL.Nat8);
  const Tokens__1 = IDL.Nat;
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(Subaccount),
  });
  const ApproveError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'AllowanceChanged' : IDL.Record({ 'current_allowance' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat }),
    'Expired' : IDL.Record({ 'ledger_time' : IDL.Nat }),
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const ApproveResult = IDL.Variant({ 'Ok' : Tokens__1, 'Err' : ApproveError });
  const TransferFromError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'TemporarilyUnavailable' : IDL.Null,
    'InsufficientAllowance' : IDL.Record({ 'allowance' : IDL.Nat }),
    'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat }),
    'TooOld' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const TransferFromResult = IDL.Variant({
    'Ok' : IDL.Nat,
    'Err' : TransferFromError,
  });
  const UserBalanceShow = IDL.Record({
    'account_id' : IDL.Text,
    'principal' : IDL.Opt(IDL.Principal),
    'amount' : IDL.Nat,
  });
  const Timestamp = IDL.Nat64;
  const ICPTransaction = IDL.Record({
    'to' : IDL.Text,
    'fee' : IDL.Nat,
    'icp_chain_index' : IDL.Nat,
    'from' : IDL.Text,
    'timestamp' : Timestamp,
    'amount' : IDL.Nat,
    'usdt_amount' : IDL.Nat,
  });
  const MeMeTransactionType = IDL.Variant({
    'Approve' : IDL.Null,
    'Burn' : IDL.Null,
    'Mint' : IDL.Null,
    'Transfer' : IDL.Null,
  });
  const MeMeTransactionLog = IDL.Record({
    'to' : IDL.Principal,
    'from' : IDL.Principal,
    'usdt' : IDL.Float64,
    'meme_amount' : IDL.Nat,
    't_type' : MeMeTransactionType,
    'timestamp' : Timestamp,
    'icp_amount' : IDL.Nat,
    'index' : IDL.Nat,
  });
  const MeMeTransactionStatus = IDL.Variant({
    'Error' : IDL.Null,
    'Complete' : IDL.Null,
  });
  const MeMeTransaction = IDL.Record({
    'to' : IDL.Opt(IDL.Principal),
    'fee' : IDL.Opt(IDL.Nat),
    'from' : IDL.Principal,
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    't_hash' : IDL.Text,
    't_status' : MeMeTransactionStatus,
    't_type' : MeMeTransactionType,
    't_timestamp' : IDL.Nat,
    't_index' : IDL.Nat,
    'amount' : IDL.Nat,
    'spender_account' : IDL.Opt(IDL.Principal),
  });
  const MeMeCoin = IDL.Service({
    'back_icp' : IDL.Func([], [], []),
    'buy' : IDL.Func([IDL.Nat, IDL.Text], [TransferResult], []),
    'create_account' : IDL.Func([], [IDL.Text], ['query']),
    'cycleBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'destroy' : IDL.Func(
        [
          IDL.Record({
            'fee' : IDL.Opt(Tokens),
            'memo' : IDL.Opt(Memo),
            'user' : Account__1,
            'created_at_time' : IDL.Opt(Timestamp__1),
            'amount' : Tokens,
          }),
        ],
        [TransferResult__1],
        [],
      ),
    'do_call_icpex' : IDL.Func([], [Result], []),
    'do_call_icpex_approve' : IDL.Func([IDL.Nat], [Result], []),
    'do_launch' : IDL.Func([], [IDL.Text], []),
    'get_address' : IDL.Func([], [IDL.Text], []),
    'get_icp_usd_price' : IDL.Func([], [IDL.Float64], []),
    'get_real_icp_balance' : IDL.Func([], [IDL.Nat], []),
    'icp_buy' : IDL.Func([IDL.Principal, IDL.Nat], [TransferResult], []),
    'icp_sell' : IDL.Func([IDL.Principal, IDL.Nat], [TransferResult], []),
    'icp_total_amount' : IDL.Func([], [IDL.Nat], []),
    'icrc1_balance_of' : IDL.Func([Account__1], [Tokens], ['query']),
    'icrc1_decimals' : IDL.Func([], [IDL.Nat8], ['query']),
    'icrc1_fee' : IDL.Func([], [IDL.Nat], ['query']),
    'icrc1_metadata' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, Value))],
        ['query'],
      ),
    'icrc1_minting_account' : IDL.Func([], [IDL.Opt(Account__1)], ['query']),
    'icrc1_name' : IDL.Func([], [IDL.Text], ['query']),
    'icrc1_supported_standards' : IDL.Func(
        [],
        [IDL.Vec(IDL.Record({ 'url' : IDL.Text, 'name' : IDL.Text }))],
        ['query'],
      ),
    'icrc1_symbol' : IDL.Func([], [IDL.Text], ['query']),
    'icrc1_total_supply' : IDL.Func([], [Tokens], ['query']),
    'icrc1_transfer' : IDL.Func(
        [
          IDL.Record({
            'to' : Account__1,
            'fee' : IDL.Opt(Tokens),
            'memo' : IDL.Opt(Memo),
            'from_subaccount' : IDL.Opt(Subaccount__1),
            'created_at_time' : IDL.Opt(Timestamp__1),
            'amount' : Tokens,
          }),
        ],
        [TransferResult__1],
        [],
      ),
    'icrc2_allowance' : IDL.Func(
        [IDL.Record({ 'account' : Account__1, 'spender' : IDL.Principal })],
        [Tokens__1],
        ['query'],
      ),
    'icrc2_approve' : IDL.Func(
        [
          IDL.Record({
            'fee' : IDL.Opt(Tokens),
            'memo' : IDL.Opt(Memo),
            'from_subaccount' : IDL.Opt(Subaccount__1),
            'created_at_time' : IDL.Opt(Timestamp__1),
            'amount' : Tokens,
            'spender' : Account,
          }),
        ],
        [ApproveResult],
        [],
      ),
    'icrc2_transfer_from' : IDL.Func(
        [
          IDL.Record({
            'to' : Account,
            'fee' : IDL.Opt(Tokens),
            'spender_subaccount' : IDL.Opt(Subaccount__1),
            'from' : Account,
            'memo' : IDL.Opt(Memo),
            'created_at_time' : IDL.Opt(Timestamp__1),
            'amount' : Tokens,
          }),
        ],
        [TransferFromResult],
        [],
      ),
    'init_main_balance' : IDL.Func([], [], []),
    'launch_able' : IDL.Func([], [IDL.Bool], []),
    'main_balance_show' : IDL.Func([], [UserBalanceShow], ['query']),
    'meme_total_amount' : IDL.Func([], [Tokens], ['query']),
    'query_call_icpex_log' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'query_icp_count' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Nat], []),
    'query_meme_count' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Nat], []),
    'query_quxian_log' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'query_result' : IDL.Func([IDL.Text], [IDL.Opt(TransferResult)], []),
    'sell' : IDL.Func([IDL.Nat, IDL.Text], [TransferResult], []),
    'set_init_icp_amount' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Nat], []),
    'show_all_icp_transaction_logs' : IDL.Func(
        [],
        [IDL.Vec(ICPTransaction)],
        [],
      ),
    'show_balance_map' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, UserBalanceShow))],
        ['query'],
      ),
    'show_cost_log' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'show_detail_info' : IDL.Func(
        [],
        [
          IDL.Record({
            'market_info' : IDL.Record({
              'market_cap' : IDL.Nat,
              'mobility' : IDL.Nat,
              'one_day_trading_volume' : IDL.Nat,
              'current_price' : IDL.Nat,
            }),
            'base_info' : IDL.Record({
              'token_symbol' : IDL.Text,
              'logo' : IDL.Text,
              'canister_id' : IDL.Text,
              'create_account' : IDL.Text,
              'launch' : IDL.Bool,
              'icpex_pool_canister_id' : IDL.Text,
              'token_name' : IDL.Text,
            }),
          }),
        ],
        [],
      ),
    'show_last_log' : IDL.Func([], [IDL.Opt(MeMeTransactionLog)], ['query']),
    'show_logs' : IDL.Func([], [IDL.Vec(MeMeTransactionLog)], ['query']),
    'show_meme_transaction' : IDL.Func(
        [],
        [IDL.Vec(MeMeTransaction)],
        ['query'],
      ),
    'total_icp_transcation_amount' : IDL.Func([], [IDL.Nat], ['query']),
    'total_icp_transcation_one_day_amount' : IDL.Func([], [IDL.Nat], ['query']),
    'update_config' : IDL.Func(
        [IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat), IDL.Opt(IDL.Nat)],
        [IDL.Text],
        [],
      ),
    'withdraw_all' : IDL.Func([], [IDL.Text], []),
  });
  return MeMeCoin;
};
export const init = ({ IDL }) => {
  return [
    IDL.Record({
      'decimals' : IDL.Nat8,
      'logo_base64' : IDL.Text,
      'token_symbol' : IDL.Text,
      'transfer_fee' : IDL.Nat,
      'metadata' : IDL.Vec(
        IDL.Record({ 'key' : IDL.Text, 'value' : IDL.Text })
      ),
      'logo' : IDL.Text,
      'create_account' : IDL.Principal,
      'token_name' : IDL.Text,
      'total_supply' : IDL.Nat,
    }),
  ];
};
