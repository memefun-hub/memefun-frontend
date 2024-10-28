'use client';

import { useEffect, useState } from 'react';
import { ItemMainContent } from './content';
import { ItemRightInfo } from './rightInfo';
import Image from 'next/image';
import Card from '@mui/material/Card';
import { Box, CardContent, CircularProgress, Typography } from '@mui/material';
import { show_detail_info } from '@/actor/meme_icrc2';

interface memeInfoProp {
  canister_id: string;
  logo: string;
  token_name: string;
  symbol: string;
  description: string;
  create_account: string;
  market_cap: number | 0;
  mobility: number | 0;
  one_day_trading_volume: number | 0;
  current_price: string | '0';
}

export const HomeItemContent = (props: { /*id: string;*/ data: any; onBack: () => void }) => {
  const { data, onBack } = props;

  const [loading, setLoading] = useState(true);

  const [memeInfo, setMemeInfo] = useState<memeInfoProp>({
    canister_id: '',
    logo: '',
    token_name: '',
    symbol: '',
    description: '',
    create_account: '',
    market_cap: 0,
    mobility: 0,
    one_day_trading_volume: 0,
    current_price: '0',
  });

  useEffect(() => {
    setLoading(true);

    // get meme details
    async function call() {
      const res = await show_detail_info(data.canister_id);
      console.log('show_detail_info:', res);

      setMemeInfo({
        canister_id: res.base_info.canister_id,
        logo: res.base_info.logo,
        token_name: res.base_info.token_name,
        symbol: res.base_info.token_symbol,
        description: data.description,
        create_account: res.base_info.create_account,
        market_cap: Number(res.market_info.market_cap) / 10 ** 8,
        mobility: Number(res.market_info.mobility) / 10 ** 8,
        one_day_trading_volume: Number(res.market_info.one_day_trading_volume) / 10 ** 8,
        current_price: (Number(res.market_info.current_price) / 10 ** 8).toFixed(8),
      });
      console.log(Number(res.market_info.current_price) / 10 ** 8);
      setLoading(false);
    }

    call();
  }, [props.data]);

  return (
    <div className="flex flex-col p-6 text-white">
      <div className="flex justify-center py-3">
        <div className="cursor-pointer text-[30px]" onClick={onBack}>{`[Back]`}</div>
      </div>
      {/*meme info*/}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="flex w-full cursor-pointer gap-2 flex-col md:flex-row">
          <Image src={memeInfo?.logo} width={100} height={100} alt="" />
          <div className="ml-3">
            <div className="text-gray-300">
              <span className="text-lg">
                {memeInfo!.token_name} ({memeInfo!.symbol})
              </span>
            </div>
            <div className="font-semibold text-gray-300">
              <span>Created By: {memeInfo!.create_account}</span>
            </div>
            <div className="font-semibold text-gray-300">
              <span>canister id: {memeInfo!.canister_id}</span>
            </div>
            <div className="font-semibold text-gray-300">
              <span>{memeInfo!.description}</span>
            </div>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-grow text-xs"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
          >
            {[
              { label: 'Price', value: memeInfo!.current_price },
              { label: 'MarketCap', value: memeInfo!.market_cap },
              { label: 'Liquidity', value: memeInfo!.mobility },
              { label: '24H Volume', value: memeInfo!.one_day_trading_volume },
            ].map((item, index) => (
              <Card key={index} className="flex-1" sx={{ backgroundColor: '#62dd85', height: '50px' }}>
                <CardContent className="!p-2">
                  <Typography sx={{ color: 'text.secondary', fontSize: 12, lineHeight: 1 }}>{item.label}</Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      lineHeight: 1.2,
                      mt: 0.5,
                    }}
                  >
                    ${' '}
                    {typeof item.value === 'number'
                      ? item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                      : item.value}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 mt-5">
        <ItemMainContent canister={data.canister_id} />
        <ItemRightInfo canister={data.canister_id} logo={data.logo} />
      </div>
    </div>
  );
};
