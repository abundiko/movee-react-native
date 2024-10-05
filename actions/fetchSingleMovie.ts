'use server'

import { BACKEND_HOST } from "@/constants";
import { MovieDetailed } from "@/types";


export async function fetchSingleMovie(id: string): Promise<MovieDetailed | null> {
    
    try {
        const req = await fetch(BACKEND_HOST + `/movies/${id}`);
        const res = await req.json();
        // console.log({be:res.data});
        
        if (!res.success) throw new Error("")
        return res.data as MovieDetailed
    } catch (error) {
        return null;
    }
}