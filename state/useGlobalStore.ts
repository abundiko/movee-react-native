import { Movie } from "@/types";
import { create } from "zustand";

export type UserState = {
    movie: Movie | null;
    setMovie: (club: Movie) => void;
};

export const useGlobalStore = create<UserState>((set: any) => ({
    movie: null,
    setMovie: (movie: Movie) => set({ movie }),
}));
