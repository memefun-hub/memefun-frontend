import { HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { useWalletStore } from '@/store/useWalletStore';
import { WalletType } from '@/constants/wallet';
import { PlugConnector } from '@/utils/connectors/plug';
import { ICP_HOST } from '@/actor';
import { InternetIdentityConnector } from '@/utils/connectors/internet-identity';

export async function connectWallet(walletType: string) {
  const walletStateProps = useWalletStore.getState();

  const config = {
    host: ICP_HOST,
    whitelist: [],
  };

  if (walletType === WalletType.PLUG) {
    const connector = new PlugConnector(config);
    await connector?.init();

    await connector?.connect();

    walletStateProps.setConnected(connector, WalletType.PLUG);
    walletStateProps.setAgent(await connector.createAgent());

    localStorage.setItem('walletType', walletType);
  } else if (walletType === WalletType.IC) {
    const connector = new InternetIdentityConnector(config);
    await connector?.init();
    if (!(await connector.isConnected())) {
      await connector?.connect();
    }

    walletStateProps.setConnected(connector, WalletType.IC);
    walletStateProps.setAgent(await connector.createAgent());

    localStorage.setItem('walletType', walletType);
  }
}
