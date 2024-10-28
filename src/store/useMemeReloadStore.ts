import { create } from 'zustand';

interface ReloadStateProps {
  isReload: boolean;
  setReload: (state: boolean) => void;
}

export const useMemeReloadStore = create<ReloadStateProps>((set) => ({
  isReload: false,
  setReload: (state: boolean) => set({ isReload: state }),
}));
