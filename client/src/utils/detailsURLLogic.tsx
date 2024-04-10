import { itemProp } from "./dataProps";

const createURL = (singleData:itemProp) => {
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
        urlToDirect = `/details?itemName=${singleData.name}&imageLink=${singleData.coverImage}&type=track&id=${singleData.id}&preview=${singleData.preview}`}

    return urlToDirect;
}

export default createURL;