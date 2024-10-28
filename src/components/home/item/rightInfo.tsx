'use client';

import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { icrc1_balance_of, icrc1_fee, icrc1_symbol, icrc2Approve } from '@/actor/ledger';
import { useWalletStore } from '@/store/useWalletStore';
import { Alert, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { buyMeme, queryTimeoutResult, sellMeme } from '@/actor/meme_icrc2';
import BigNumber from 'bignumber.js';
import { v4 as uuidv4 } from 'uuid';

const tabs = [
  { key: '1', label: 'Buy' },
  { key: '2', label: 'Sell' },
];

export const ItemRightInfo = (props: { canister: string; logo: string }) => {
  const [tab, setTab] = useState<string>(tabs[0]?.key as string);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [symbol, setSymbol] = useState<string | undefined>('ICP');
  const [icon, setIcon] = useState('/images/connect/InternetIdentity.svg');

  const { connect, accountId, agent, isLogin } = useWalletStore();

  function handlePlaceTradeClick() {
    console.log('handlePlaceTradeClick');

    if (!isLogin) {
      setShowAlert(true);
      return;
    }

    async function call() {
      setLoading(true);
      const uuid = uuidv4();
      console.log('uuid:', uuid);
      try {
        const amountBig = new BigNumber(amount);
        const feeBig = amountBig.multipliedBy(0.01).plus(0.0002);
        const approveBig = amountBig.plus(feeBig);

        if (tab === '1') {
          console.log('buy', props.canister);
          const approveResult = await icrc2Approve(
            agent!,
            props.canister, // MEME_CANISTER_ID
            approveBig.toNumber(),
          );
          console.info('approveResult:', approveResult);
          // const buyResult = await buyMeme(agent!, uuid, props.canister, amount);
          const buyResult = await Promise.race([
            buyMeme(agent!, uuid, props.canister, amount),
            new Promise((_, reject) => setTimeout(() => reject(new Error('meme icp mainnet timeout')), 60000)),
          ]);
          console.info('buyResult:', buyResult);
          const balance = await icrc1_balance_of(agent!, connect?.getPrincipal!, '');
          setBalance(Number(balance) / 10 ** 8);
        } else if (tab === '2') {
          // sell
          console.log('sell');
          // const approveResult = await icrc2Approve(agent!, /*MEME_CANISTER_ID*/ props.canister, /*amount*/ amount);
          // console.info('approveResult:', approveResult);
          // const sellResult = await sellMeme(agent!, uuid, props.canister, amount);
          const sellResult = await Promise.race([
            sellMeme(agent!, uuid, props.canister, amount),
            new Promise((_, reject) => setTimeout(() => reject(new Error('meme icp mainnet timeout')), 60000)),
          ]);
          console.info('sellResult:', sellResult);
          const balance = await icrc1_balance_of(agent!, connect?.getPrincipal!, props.canister);
          setBalance(Number(balance) / 10 ** 8);
        }
      } catch (err) {
        console.error(err);
        if (err instanceof Error && err.message === 'meme icp mainnet timeout') {
          // const queryResult = await queryTimeoutResult(uuidv4(), props.canister);
          let queryResult;
          console.log('uuid:', uuid);
          for (let i = 0; i < 5; i++) {
            queryResult = await queryTimeoutResult(uuid, props.canister);
            if (queryResult.length > 0) break;
            await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds before retrying
          }
          console.info('queryResult:', queryResult);
        }
      } finally {
        setLoading(false);
      }
    }

    call();
  }

  function handleTabChange(key: string) {
    setTab(key);

    let canisterId: string | undefined = undefined;
    if (key !== '1') {
      setIcon(props.logo);
      canisterId = props.canister;
      icrc1_symbol(canisterId).then((res) => {
        setSymbol(res);
      });
    } else {
      setIcon('/images/connect/InternetIdentity.svg');
      setSymbol('ICP');
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (value >= 0.1) {
      setAmount(value);
    } else {
      setAmount(0.1);
    }
    // setAmount(value);
  }

  useEffect(() => {
    async function call() {
      if (!isLogin) return;

      let canisterId: string | undefined = undefined;
      if (tab !== '1') canisterId = props.canister;

      // get balance
      const balance = await icrc1_balance_of(agent!, connect?.getPrincipal!, canisterId);
      console.log(balance);
      setBalance(Number(balance) / 10 ** 8);
    }

    handleTabChange(tab);
    call();
  }, [tab]);

  return (
    <div className="flex w-full md:w-[20%] flex-shrink-0 flex-col gap-4 text-gray-400">
      <div className="rounded-lg bg-[#2e303a] p-4">
        <div className="flex items-center gap-2">
          {cloneDeep(tabs).map((item) => (
            <div
              key={item.key}
              className={classNames(
                'flex-1 rounded-md py-3 text-center text-[20px] font-bold',
                item.key === tab
                  ? 'cursor-default bg-[#62dd85] text-black'
                  : 'cursor-pointer bg-[#212938] text-gray-400',
              )}
              onClick={() => handleTabChange(item.key)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-white p-2">
          <input
            className="min-w-[100px] flex-1 border-0 bg-transparent text-white outline-none"
            placeholder="0.1"
            onChange={(e) => handleInputChange(e)}
          />
          <div>{symbol}</div>
          <Image className="h-10 w-10 rounded-full border border-white" src={icon} width={100} height={100} alt="" />
        </div>
        <div className="text-[16px] mt-2">
          balance: {balance} {symbol}
        </div>
        <LoadingButton
          className="mt-4 cursor-pointer rounded-lg py-4 font-bold hover:bg-opacity-80 w-full"
          onClick={handlePlaceTradeClick}
          loading={loading}
          sx={{
            textTransform: 'none',
            backgroundColor: '#62dd85',
            textAlign: 'center',
            color: 'black',
            fontSize: '20px',
          }}
        >
          place trade
        </LoadingButton>
      </div>
      <div>
        <p>
          where the market cap reaches $56,109 all the liquidity from the bonding curve will be deposited into DEX and
          burned. progression increases as the price goes up.
        </p>
        <br />
        <p>
          there are 464,992,442 tokens still available for sale in the bonding curve and there is 13.214 ICP in the
          bonding curve.
        </p>
        <br />
      </div>

      <Snackbar
        open={showAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
      >
        <Alert variant="filled" severity="warning">
          Please connect wallet first
        </Alert>
      </Snackbar>
    </div>
  );
};
