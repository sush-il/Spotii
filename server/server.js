const express = require('express')
const querystring = require('querystring');
require('dotenv').config({ path: './.env.local' })

const app = express()

clientId = process.env.CLIENT_ID;
clientSecret = process.env.CLIENT_SECRET;


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