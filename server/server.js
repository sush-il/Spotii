const express = require('express')
const querystring = require('querystring');
const request = require('request');
require('dotenv').config({ path: './.env.local' })

const app = express()

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

redirect_uri = "http://127.0.0.1:5000/callback"
//redirect_uri_callback = "http://127.0.0.1:5000/callback/"

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

app.get('/callback', function(req, res) {
    const authCode = req.query.code || null;

    const form = {
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: redirect_uri,
    };

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    };

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST', // Use POST method for making the request
        headers: headers,
        form: querystring.stringify(form), // Make sure to stringify the form data
        json: true
    };

    // Make a POST request to exchange authorization code for access token
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            const refresh_token = body.refresh_token; // Corrected typo

            res.send("Your access token is: " + access_token);
        } else {
            res.send("Error when fetching access token");
        }
    });
});

  

app.listen(5000, () => {console.log("server started on port 5000")})