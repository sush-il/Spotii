interface nameCardProp {
    id: string,
    name: string,
    coverImage: string,
    playlistLink?: string,
    totalTracks?: number,
    genres? : string[],
    popularity? : number
}

const createURL = (singleData:nameCardProp) => {
    let urlToDirect;
    if(singleData.playlistLink != null){
        urlToDirect = `/details?itemName=${singleData.name}
        &imageLink=${singleData.coverImage}&itemLink=${singleData.playlistLink}&type=playlist`
    }
    else if(singleData.popularity != null){
        urlToDirect = `/details?itemName=${singleData.name}
        &imageLink=${singleData.coverImage}&popularity=${singleData.popularity}&genres=${singleData.genres}&type=artist`

    }
    else {
        urlToDirect = `/details?itemName=${singleData.name}
        &imageLink=${singleData.coverImage}&type=track&id=${singleData.id}`}

    return urlToDirect;
}

export default createURL;