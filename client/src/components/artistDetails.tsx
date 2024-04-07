interface artistDetailsProp {
    name: string,
    coverImage: string,
    popularity: string,
    genres:string,
}

const ArtistDetails: React.FC<{data: artistDetailsProp}> =  ({data}) => {
    return (
        <div className="container" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
        <img src={data.coverImage} style={{
            width: '30rem',
            borderRadius: '3rem',
            paddingTop: '5%',
        }} alt="Cover" />
        <h2><b>{data.name}</b></h2>
        <p style={{letterSpacing:"2px"}}>[{data.genres}]</p>
        <p> Popularity: {data.popularity}%</p>
    </div>
    )
}

export default ArtistDetails;