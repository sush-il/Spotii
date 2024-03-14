const express = require('express')
const querystring = require('querystring');
const app = express()



clientId = "83cc05d765584a0a8806c0911f7343b7"
clientSecret = "8b2c0ea3808347f28d85044611d1fe29"

redirect_uri = "http://127.0.0.1:5000/"
scope = "user-library-read user-top-read playlist-read-private playlist-read-collaborative user-read-recently-played"


app.get("/login", (req, res) => {
    res.redirect("https://accounts.spotify.com/authorize?" +  querystring.stringify({
        response_type: "code",
        client_id: clientId, 
        redirect_uri: redirect_uri,
        scope: scope,
    })
    
    )
})

app.listen(5000, () => {console.log("server started on port 5000")})