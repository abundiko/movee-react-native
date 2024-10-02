'use server'

import { BACKEND_HOST } from "@/constants";
import { buildUrlQuery } from "@/functions/helpers";
import { Movie } from "@/types";

export type FetchMoviesParams = {
    q?: string;
    page?: number;
    "country[]"?: string;
    "genre[]"?: string;
    "year[]"?: string;
}

export async function fetchMovies(params: FetchMoviesParams): Promise<Movie[] | null> {
    console.log(params);

    try {
        const req = await fetch(BACKEND_HOST + "/movies" + buildUrlQuery(params));
        const res = await req.json();
        console.log({ res });

        if (!res.success) throw new Error("")
        return res.data as Movie[]
    } catch (error) {
        return null;
    }
}