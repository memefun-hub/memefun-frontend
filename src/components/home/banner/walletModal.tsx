'use client';

import { Modal } from '@/components/modal';
import { InternetIdentityConnector } from '@/utils/connectors/internet-identity';
import { Box, Typography } from '@mui/material';
import { PlugConnector } from '@/utils/connectors/plug';
import { useState } from 'react';
import { useWalletStore } from '@/store/useWalletStore';
import { WalletType } from '@/constants/wallet';
import { ICP_HOST } from '@/actor';
import { connectWallet } from '@/utils/wallet';

export const HomeBannerWalletModal = (props: { visible: boolean; onClose?: () => void }) => {
  const { visible, onClose } = props;

  const walletStateProps = useWalletStore();

  const [isAlert, setIsAlert] = useState(false);

  // TODO plug wallet click callback
  const walletClick = async (walletType: string) => {
    if ((walletType === WalletType.PLUG && !window.ic) || !window.ic.plug) {
      // return (
      //   <Alert variant="filled" severity="warning">
      //     Plug Wallet is not installed or not detected.
      //   </Alert>
      // );
      alert('Plug Wallet is not installed or not detected.');
      return;
    }

    await connectWallet(walletType);

    // return connector?.getPrincipal
    if (onClose) {
      onClose();
    }
  };

  const WalletList = [
    // {
    //   label: 'Internet Identity',
    //   value: WalletType.IC,
    //   logo: '/images/connect/InternetIdentity.svg',
    // },
    {
      label: 'Plug Wallet',
      value: WalletType.PLUG,
      logo: '/images/connect/plugWallet.svg',
    },
  ];

  return (
    <>
      <Modal visible={visible} onClose={onClose}>
        <div className="w-[80%] max-w-[768px] space-y-3 bg-[#1b1d28] px-12 py-8 text-white">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate text-[18px]">Connect a wallet</div>
            <div
              className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-lg text-gray-200 hover:opacity-80"
              onClick={onClose}
            >
              x
            </div>
          </div>
          <div className="text-gray-500">
            {/* <span>By connecting a wallet, you agree to ICPSwap’s </span> */}
            <span>By connecting a wallet</span>
            <a
              href="https://iloveics.gitbook.io/icpswap/legal-and-privacy/icpswap-terms-of-service"
              target="_blank"
              className="cursor-pointer border-b border-transparent text-blue-700 hover:border-blue-500 hover:text-blue-500"
            ></a>
            <span> and go to MEME.FUN </span>
            <a
              href="https://iloveics.gitbook.io/icpswap/legal-and-privacy/icpswap-terms-of-service"
              target="_blank"
              className="cursor-pointer border-b border-transparent text-blue-700 hover:border-blue-500 hover:text-blue-500"
            ></a>
          </div>
          <div>
            {/* <div
            className="cursor-pointer rounded-lg bg-[#5d5d5c] p-4 text-lg font-medium hover:bg-opacity-80"
            onClick={internetIdentityClick}
          >
            Internet Identity
          </div> */}
            {WalletList.map((item) => (
              <Box
                key={item.value}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  marginTop: '10px',
                }}
                onClick={() => walletClick(item.value)}
              >
                <Typography color="white" fontSize="14px" fontWeight={700}>
                  {item.label}
                </Typography>

                <Box>
                  <img width="40px" height="40px" src={item.logo} alt="" />
                  {/*<Image style={{ width: '40px', height: '40px' }} src="/images/connect/InternetIdentity.svg" alt="" />*/}
                </Box>
              </Box>
            ))}
          </div>
        </div>
      </Modal>
      {/*{isAlert && <Alert severity="warning">Plug Wallet is not installed or not detected.</Alert>}*/}
    </>
  );
};
