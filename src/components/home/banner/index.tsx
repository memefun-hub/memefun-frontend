'use client';

import {
  Grid,
  Box,
  useTheme,
  Typography,
  createTheme,
  useMediaQuery,
  SvgIcon,
  ButtonBase,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import { DashedImage } from '../../dashedImage';
import Meme1 from '@/assets/images/meme1.png';
import Meme2 from '@/assets/images/meme2.png';
import Meme3 from '@/assets/images/meme3.png';
import Meme4 from '@/assets/images/meme4.png';
import Meme5 from '@/assets/images/meme5.png';
import BannerImg from '@/assets/images/banner.png';
import TgImg from '@/assets/images/tele.png';
import TwitterImg from '@/assets/images/twitter.png';

import styles from './style.module.scss';
import { Button } from '@/components/button';
import { Border } from '@/components/border';
import { HomeBannerStartModal } from './startModal';
import { useEffect, useState } from 'react';
import { HomeBannerWalletModal } from './walletModal';
import { shorten } from '@/utils/shorten';
import { useWalletStore } from '@/store/useWalletStore';
import { connectWallet } from '@/utils/wallet';
import { Logout } from '@mui/icons-material';

export const HomeBanner = () => {
  const [homeBannerStartModalVisible, setHomeBannerStartModalVisible] = useState<boolean>(false);
  const [homeBannerWalletModalVisible, setHomeBannerWalletModalVisible] = useState<boolean>(false);

  const [isLogin, setIsLogin] = useState<boolean>(false);

  const walletStateProps = useWalletStore();

  useEffect(() => {
    async function call() {
      const storageWallet = localStorage.getItem('walletType');
      console.log('storageWallet', storageWallet);
      if (storageWallet == null || storageWallet == '') {
        setIsLogin(false);
        walletStateProps.reset();
        return;
      }

      await connectWallet(storageWallet!);
      if (await walletStateProps.connect?.expired()) {
        setIsLogin(false);
        walletStateProps.reset();
      } else {
        setIsLogin(true);
      }
    }

    call();
  }, [isLogin, walletStateProps.walletType]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handlePrincipalClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleLogout() {
    setAnchorEl(null);
    walletStateProps.reset();
  }

  return (
    <>
      <div className={styles.banner}>
        <Border className="text-green-600" />
        <div className={styles['banner-content']}>
          <DashedImage
            className="absolute left-[49px] top-[137px] w-[69.5px] h-[69px] md:w-[139px] md:h-[138px]"
            src={Meme1}
          />
          <DashedImage
            className="absolute bottom-[20px] md:bottom-[12px] left-[144px] w-[74px] md:w-[148px] h-[71px] md:h-[142px]"
            src={Meme3}
          />
          <DashedImage
            className="absolute right-[104px] md:right-[208px] top-[96px] w-[57px] md:w-[114px] h-[55px] md:h-[110px]"
            src={Meme2}
          />
          <DashedImage
            className="absolute bottom-[20px] md:bottom-[12px] right-[20px] md:right-[12px] w-[56px] md:w-[112px] h-[75.5px] md:h-[151px]"
            src={Meme4}
          />
          <DashedImage
            className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-[310px] md:w-[620px] h-[116.5px] md:h-[233px]"
            src={BannerImg}
          />

          <div className="relative flex items-center justify-center gap-2">
            <div
              className="mx-auto mt-3 py-2 flex w-[65%] items-center justify-between gap-4 rounded-lg px-[8%] font-bold text-black"
              style={{
                background: 'linear-gradient(180deg, white, #7EFF5D)',
                clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
              }}
            >
              <div className="flex items-center gap-8">
                <DashedImage className="w-[34px] md:w-[68px] h-[31.5px] md:h-[63px]" src={Meme5} />
                <div className={styles.stock} data-content="MEME FUN">
                  MEME FUN
                </div>
              </div>

              {!isLogin ? (
                <Button
                  className="py-0.5 text-[14px] font-extrabold"
                  onClick={() => setHomeBannerWalletModalVisible(true)}
                >
                  Connect Wallet
                </Button>
              ) : (
                // <ButtonBase sx={{ borderRadius: '12px' }}>
                //   <Chip
                //     ref={anchorRef}
                //     classes={{ root: classes.profileRoot, label: classes.profileLabel }}
                //     label={shorten(walletStateProps.connect?.getPrincipal)}
                //     variant="outlined"
                //     onClick={isConnected ? handleToggle : handleConnectWallet}
                //     color="primary"
                //     title={walletStateProps.connect?.getPrincipal}
                //   />
                // </ButtonBase>

                <div>
                  <Button
                    className="py-0.5 text-[14px] font-extrabold"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handlePrincipalClick}
                  >
                    {shorten(walletStateProps.connect?.getPrincipal, 6)}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClick={() => setAnchorEl(null)}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <div className="w-[400px]">
                      {/* account id */}
                      <Box
                        sx={{
                          wordBreak: 'break-all',
                          padding: '12px',
                          textAlign: 'left',
                          border: '1px solid #EFEFFF',
                          borderRadius: '8px',
                          background: 'linear-gradient(180deg, white, #7EFF5D)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 4px', margin: '0 0 8px 0' }}>
                          <Box
                            sx={{
                              padding: '3px 6px ',
                              background: 'linear-gradient(180deg, white, #7EFF5D)',
                              borderRadius: '30px',
                              color: '#111936',
                              fontSize: '10px',
                            }}
                            component="span"
                          >
                            Account ID
                          </Box>
                        </Box>

                        <Typography
                          component="span"
                          sx={{
                            whiteSpace: 'break-spaces',
                            cursor: 'pointer',
                            color: '#111936',
                          }}
                        >
                          {walletStateProps.accountId}
                        </Typography>
                      </Box>

                      {/* principal id */}
                      <Box
                        sx={{
                          wordBreak: 'break-all',
                          padding: '12px',
                          textAlign: 'left',
                          border: '1px solid #EFEFFF',
                          borderRadius: '8px',
                          background: 'linear-gradient(180deg, white, #7EFF5D)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 4px', margin: '0 0 8px 0' }}>
                          <Box
                            sx={{
                              padding: '3px 6px ',
                              background: 'linear-gradient(180deg, white, #7EFF5D)',
                              borderRadius: '30px',
                              color: '#111936',
                              fontSize: '10px',
                            }}
                            component="span"
                          >
                            Principal ID
                          </Box>
                        </Box>

                        <Typography
                          component="span"
                          sx={{
                            whiteSpace: 'break-spaces',
                            cursor: 'pointer',
                            color: '#111936',
                          }}
                        >
                          {walletStateProps.connect?.getPrincipal}
                        </Typography>
                      </Box>

                      {/* logout */}
                      <div
                        className="mt-5"
                        onClick={handleLogout}
                        style={{ background: 'linear-gradient(180deg, white, #7EFF5D)' }}
                      >
                        <Box
                          sx={{
                            padding: '3px 6px ',
                            borderRadius: '30px',
                            color: '#111936',
                            fontSize: '20px',
                          }}
                          component="span"
                        >
                          <Logout sx={{ fontSize: '20px' }} /> Logout
                        </Box>
                      </div>
                    </div>
                  </Menu>
                </div>
              )}
            </div>

            <div className="absolute right-4 flex items-center gap-2">
              <a href="https://t.me/+PRjVm3181dMzZjJl" target="_blank">
                <DashedImage className="p-2 w-[48px] h-[48px]" src={TgImg} />
              </a>
              <a href="https://x.com/memefunicp?s=21" target="_blank">
                <DashedImage className="p-2 w-[48px] h-[48px]" src={TwitterImg} />
              </a>
            </div>
          </div>

          <Button
            className="absolute bottom-10 md:bottom-[4rem] left-[50%] -translate-x-[50%] py-2 pl-2 pr-3 flex items-center justify-center"
            onClick={() => setHomeBannerStartModalVisible(true)}
          >
            <span className="text-[24px] font-bold">Launch Coin</span>
          </Button>
        </div>
      </div>

      <HomeBannerStartModal
        visible={homeBannerStartModalVisible}
        onClose={() => setHomeBannerStartModalVisible(false)}
      />

      <HomeBannerWalletModal
        visible={homeBannerWalletModalVisible}
        onClose={() => setHomeBannerWalletModalVisible(false)}
      />
    </>
  );
};
