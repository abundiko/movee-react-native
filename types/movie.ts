export type Movie = {
    id: string;
    imgUrl: string;
    country: string;
    title: string;
    year: string;
    duration: string;
    rate: string;
    postedAt: string;
};

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