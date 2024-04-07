export interface itemProp{
    id: string,
    playlistLink: string,
    name: string,
    coverImage: string,
    totalTracks?: number, 
    popularity?: number,
    genres?: string[]
}

export interface trackFeatures {
    danceability: number,
    energy: number,
    loudness: number
    speechiness: number, 
    acousticness: number,
    instrumentalness: number,
    liveness: number ,
    valence: number ,
}

export interface trackProps{
    id: string,
    name:string,
    popularity:number,
    coverImage:string,
    artist?:string
    preview?:string
}

export interface playlistDetailProps {
    itemName: string,
    coverImage: string,
    allTracks: trackProps[]
}