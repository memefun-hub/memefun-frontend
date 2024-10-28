'use client';

import { Input } from '@/components/input';
import { Modal } from '@/components/modal';
import { useEffect, useState } from 'react';
import { mintMeme, queryTimeoutResult } from '@/actor/meme';
import { Alert, Snackbar } from '@mui/material';
import { imageFileToIPFS } from '@/utils/ipfs/pinata';
import { convertImageToBase64 } from '@/utils/base64';
import { useWalletStore } from '@/store/useWalletStore';
import { icrc2Approve } from '@/actor/ledger';
import { MEME_CANISTER_ID } from '@/actor';
import { LoadingButton } from '@mui/lab';
import { useMemeReloadStore } from '@/store/useMemeReloadStore';
import { v4 as uuidv4 } from 'uuid';

const amount = 1;
const PINATA_PUBLIC_GATEWAY = process.env.PINATA_PUBLIC_GATEWAY!;

export const HomeBannerStartModal = (props: { visible: boolean; onClose?: () => void }) => {
  const { visible, onClose } = props;

  const [isVisible, setIsVisible] = useState<boolean>(visible);
  const [showAlert, setShowAlert] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // form
  const [name, setName] = useState<string>('');
  const [ticker, setTicker] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<{ file: File; value: string } | undefined>();

  const { connect, accountId, agent, isLogin } = useWalletStore();
  const [loading, setLoading] = useState(false);

  const reloadStateProps = useMemeReloadStore();

  function reset() {
    setName('');
    setTicker('');
    setDescription('');
    setImage(undefined);
    setLoading(false);
    setErrorMessage(null);
  }

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const validateFile = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isSizeValid = file.size < 500 * 1024; // 500KB
    return isImage && isSizeValid;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        setImage({ file, value: e.target.value });
        setErrorMessage(null); // Clear any previous error
      } else {
        setErrorMessage('image file size limit 500KB');
        setImage(undefined); // Reset image state
      }
    }
  };

  const onClickCreateCoin = async () => {
    if (!isLogin) {
      setShowAlert(2);
      return;
    }

    const uuid = uuidv4();
    try {
      setLoading(true);
      const bid = await imageFileToIPFS(image?.file!);
      const imageURL: string = `https://${PINATA_PUBLIC_GATEWAY}/ipfs/${bid}`;
      const logoBase64 = await convertImageToBase64(image?.file!);
      await icrc2Approve(agent!, MEME_CANISTER_ID, amount + 0.0001);

      const mintResult = await Promise.race([
        mintMeme(agent!, uuid, {
          name,
          symbol: ticker,
          logo: imageURL,
          logoBase64,
          description,
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('meme icp mainnet timeout')), 60000)),
      ]);

      console.info('mintResult:', mintResult);
      setShowAlert(1);
    } catch (err) {
      console.error('mintMeme error:', err);
      if (err instanceof Error && err.message === 'meme icp mainnet timeout') {
        let queryResult;
        for (let i = 0; i < 5; i++) {
          queryResult = await queryTimeoutResult(uuid);
          if (queryResult.length > 0) break;
          await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds before retrying
        }
        console.info('queryResult:', queryResult);
      }
    } finally {
      reset();
      onClose?.();
      reloadStateProps.setReload(true);
    }
  };

  return (
    <Modal visible={isVisible} onClose={onClose}>
      <div className="min-w-[490px] space-y-3 bg-[#1b1d28] px-12 py-8 text-white">
        <div className="flex justify-center">
          <div className="cursor-pointer text-[24px]" onClick={onClose}>{`[ close ]`}</div>
        </div>
        <div className="space-y-1">
          <div className="text-[#5e9ee9]">name</div>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <div className="text-[#5e9ee9]">ticker</div>
          <Input value={ticker} onChange={(e) => setTicker(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <div className="text-[#5e9ee9]">description</div>
          <Input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="space-y-1">
          <div className="text-[#5e9ee9]">image</div>
          <Input type="file" accept="image/*" onChange={handleFileChange} required />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </div>
        <div className="space-y-2">
          <LoadingButton
            className="w-full cursor-pointer rounded-lg py-3 hover:bg-opacity-80"
            onClick={onClickCreateCoin}
            loading={loading}
            sx={{ textTransform: 'none', backgroundColor: '#0873f9', textAlign: 'center', color: 'white' }}
          >
            CREATE COIN
          </LoadingButton>
        </div>
        <div>Cost to deploy: {amount} ICP</div>
      </div>
      {showAlert === 1 && (
        <Snackbar
          open={showAlert === 1}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
          onClose={() => setShowAlert(0)}
        >
          <Alert variant="filled" severity="success">
            🎉 Launch Meme Success!!!
          </Alert>
        </Snackbar>
      )}
      {showAlert === 2 && (
        <Snackbar
          open={showAlert === 2}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          autoHideDuration={3000}
          onClose={() => setShowAlert(0)}
        >
          <Alert variant="filled" severity="warning">
            ⚠️ Please connect wallet first
          </Alert>
        </Snackbar>
      )}
    </Modal>
  );
};
