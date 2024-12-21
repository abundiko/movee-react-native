"use server";

import { BACKEND_HOST } from "@/constants";
import { MovieSuggestion } from "@/types/movie";

export async function fetchSuggestions(): Promise<MovieSuggestion[] | null> {
  try {
    const data = [];
    let req = await fetch(BACKEND_HOST + `/suggestions/movies`);
    let res = await req.json();
    if (res.success) data.push(...res.data);
    req = await fetch(BACKEND_HOST + `/suggestions/series`);
    res = await req.json();
    if (res.success) data.push(...res.data);

    if (!!data.length) return data as MovieSuggestion[];
    throw new Error("");
  } catch (error) {
    console.error(error);
    return null;
  }
}
