import { create } from 'zustand';
import { principalToAccount } from '@/utils/principalToAccount';
import { ActorSubclass, HttpAgent, Identity } from '@dfinity/agent';
import { IConnector } from '@/utils/connectors/connectors';

interface WalletStateProps {
  connect?: IConnector;
  isLogin: boolean;
  accountId: string;
  walletType?: string;
  agent?: HttpAgent;
  setConnected: (provider: IConnector, type: string) => void;
  setAgent: (agent: HttpAgent) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletStateProps>((set) => ({
  connect: undefined,
  isLogin: false,
  accountId: '',
  walletType: undefined,
  agent: undefined,
  setConnected: (provider: IConnector, type: string) => {
    set((state) => {
      state.connect = provider;
      state.accountId = principalToAccount(provider.getPrincipal!);
      state.walletType = type;
      state.isLogin = true;
      return state;
    });
  },
  setAgent: (agent: HttpAgent) => {
    set({ agent: agent });
  },
  reset: () => {
    set((state) => {
      state.connect = undefined;
      state.accountId = '';
      state.walletType = undefined;
      state.agent = undefined;
      state.isLogin = false;

      localStorage.removeItem('walletType');
      return state;
    });
  },
}));
