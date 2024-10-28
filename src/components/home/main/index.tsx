'use client';

import { Border } from '@/components/border';
import { HomeMainItem } from './item';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { HomeItemContent } from '../item';
import { getMemeList } from '@/actor/meme';
import parser from 'postcss-selector-parser';
import { InternetIdentityConnector } from '@/utils/connectors/internet-identity';
import { useWalletStore } from '@/store/useWalletStore';
import { WalletType } from '@/constants/wallet';
import { APP_ENV } from '@/actor';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useMemeReloadStore } from '@/store/useMemeReloadStore';
import { Box, CircularProgress } from '@mui/material';

interface dataProps {
  canister_id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  logo: string;
  description: string;
}

export const HomeMain = () => {
  const [item, setItem] = useState<dataProps | undefined>();
  const [data, setData] = useState<dataProps[]>([]);

  let walletConnect = useWalletStore((state) => state.connect);
  const reloadStateProps = useMemeReloadStore();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirstLoad || reloadStateProps.isReload) {
      getMemeList().then((res: any) => {
        console.log('getMemeList:', res);

        let arr: dataProps[] = [];

        res.map((item: any) => {
          arr.push({
            canister_id: item[1].canister_id,
            name: item[1].name,
            symbol: item[1].token_symbol,
            totalSupply: 0,
            logo: item[1].image,
            description: item[1].description,
          });
        });

        setData(arr);
        setLoading(false);
      });
      setIsFirstLoad(false);
      reloadStateProps.setReload(false);
    }
  }, [isFirstLoad, reloadStateProps.isReload]);

  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    return () => {
      document.body.style.backgroundColor = 'none';
    };
  }, []);

  const walletStateProps = useWalletStore();
  useEffect(() => {
    const call = async () => {
      const config = {
        host: APP_ENV,
        whitelist: [],
      };
      const connector = new InternetIdentityConnector(config);
      const res = await connector?.init();
      if (res?.principal) {
        walletStateProps.setConnected(connector, WalletType.IC);
      }
    };
    call();
  }, []);

  return (
    <div className={styles.main}>
      <Border style={{ strokeDashoffset: '11' }} />
      <div className={styles['main-content']}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <div className={styles['main-content-group']}>
            {data.length > 0 ? (
              <div className={classNames('md:grid-cols-3 gap-4 p-3', !item ? 'flex flex-col md:grid' : 'hidden')}>
                {data.map((item) => (
                  <HomeMainItem key={item.canister_id} data={item} onClick={() => setItem(item)} />
                ))}
              </div>
            ) : (
              <div className={styles['main-content-group-no-data']}>
                <SearchOffIcon
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                  sx={{ color: 'greenyellow' }}
                />
                <div className="text-[greenyellow] text-[60px] md:text-base">No Data</div>
              </div>
            )}
            {!!item && <HomeItemContent data={item} onBack={() => setItem(undefined)} />}
          </div>
        )}
      </div>
    </div>
  );
};
