import { User } from "@/shared/user";
import { create } from "zustand";

export type UserState = {
  user: User | null;
  setUser: (user: any) => void;
  fetchUser: (accessToken: string) => Promise<void>;
  showBalance: boolean;
  toggleShowBalance: () => void;
};

export const useUserStore = create<UserState>((set: any) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  fetchUser: async (accessToken: string) => {
    const response = await fetch("/api/user");
    const data = await response.json();
    set({ user: data });
  },
  showBalance: false,
  toggleShowBalance: () => {
    set((old: UserState) => ({ showBalance: !old.showBalance }))
  }
}));
