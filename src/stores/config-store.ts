import { create } from "zustand";

type ConfigStore = {
  loading: boolean;
  setLoading: () => void;
};

export const useSetLoading = create<ConfigStore>((set) => ({
  loading: false,
  setLoading: () => set((state) => ({ loading: !state.loading })),
}));
