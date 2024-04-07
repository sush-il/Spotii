interface trackProps {
    name: string,
    coverImage: string,
}

const TrackDetails: React.FC<{data: trackProps}> = ({data}) => {
    return (
        <div className="container artist-details" id="details-main"  style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
        <img src={data.coverImage} style={{
                width: "30rem",
                borderRadius: "3rem",
                paddingTop: "5%",
                justifyContent: "center",
        }} alt="Cover" />
        <h2>{data.name}</h2>
        {/* <p> {{context.artists.0.name}} </p> */}
    </div>
    )
}

export default TrackDetails;