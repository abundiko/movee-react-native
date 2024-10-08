export type Movie = {
    id: string;
    imgUrl: string;
    country: string;
    title: string;
    year: string;
    duration: string;
    rate: string;
    postedAt: string;
    movieType: MovieType;
};

type MovieType = "Movie" | "Series"

export type MovieMeta = {
    duration: string;
    year: string;
    posted: string;
    rate: string;
    votes: string;
}

export type MovieDownloadLinks = {
    video: string;
    subtitle: string;
}

export type NameAndUrl = {
    name: string;
    url: string;
}
export type NameAndUrlList = NameAndUrl[] | undefined

export type MovieDetailed = {
    imgUrl: string;
    title: string;
    desc: string;
    seriesDetails?: {
        seasons: EpisodeOrSeason[];
        episodes: EpisodeOrSeason[];
    }
    trailer: string;
    meta: MovieMeta;
    download: MovieDownloadLinks;
    related: Movie[];
    details: {
        type: NameAndUrlList;
        "premiere date": string;
        country: NameAndUrlList;
        language: NameAndUrlList;
        genre: NameAndUrlList;
        cast: NameAndUrlList;
        references: NameAndUrlList;
    };

};

export type EpisodeOrSeason = {
    isCurrent: boolean,
    num: string,
    urlId?: string
}