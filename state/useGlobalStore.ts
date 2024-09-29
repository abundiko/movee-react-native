import { MatchDetailed } from "@/shared";
import { ClubDetailed } from "@/shared/club";
import { create } from "zustand";

export type UserState = {
    club: ClubDetailed | null;
    setClub: (club: ClubDetailed) => void;
    match: MatchDetailed | null;
    setMatch: (match: MatchDetailed) => void;
};

export const useGlobalStore = create<UserState>((set: any) => ({
    club: null,
    setClub: (club: ClubDetailed) => set({ club }),
    match: null,
    setMatch: (match: MatchDetailed) => set({ match }),
}));
