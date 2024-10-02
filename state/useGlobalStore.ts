import { Movie } from "@/types";
import { create } from "zustand";

export type UserState = {
    movie: Movie | null;
    setMovie: (club: Movie) => void;
    stream: string;
    setStream: (stream: string) => void;
};

export const useGlobalStore = create<UserState>((set: any) => ({
    movie: null,
    setMovie: (movie: Movie) => set({ movie }),
    stream: "",
    setStream: (stream: string) => set({ stream }),
}));
