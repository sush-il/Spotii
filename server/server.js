const express = require("express");
const cors = require("cors");
const request = require("request");
const querystring = require("querystring");
require("dotenv").config({ path: "./.env.local" });

const app = express();
app.use(cors());
app.use(express.json());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirect_uri = "http://127.0.0.1:3000/";
const scope =
  "user-library-read user-top-read playlist-read-private playlist-read-collaborative  user-read-recently-played user-read-currently-playing";

app.get("/login", (req, res) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirect_uri,
        scope: scope,
      })
  );
});

app.get("/", function (req, res) {
  const authCode = req.query.code || null;
  const form = {
    grant_type: "authorization_code",
    code: authCode,
    redirect_uri: redirect_uri,
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
  };

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST", // Use POST method for making the request
    headers: headers,
    form: querystring.stringify(form), // Make sure to stringify the form data
    json: true,
  };

  // Make a POST request to exchange authorization code for access token
  request.post(authOptions, async function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token;
      const refresh_token = body.refresh_token;
      const expires = body.expires_in;

      res.json(accessToken);
    } else {
      res.json("Error when fetching access tokens");
    }
  });
});

app.get("/getPlaylistData", async (req, res) => {
  try {
    const accessToken = req.query.code || null;
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    const data = await response.json();

    const requiredData = data.items.map((playlist) => ({
      id: playlist.id,
      playlistLink: playlist.href,
      name: playlist.name,
      coverImage: playlist.images[0].url,
      totalTracks: playlist.tracks.total,
    }));

    return res.json(requiredData);
  } catch (error) {
    console.error("Error fetching playlist data:", error);
  }
});

app.get("/getTracksFromPlaylist", async (req, res) => {
  const accessToken = req.query.accessToken || null;
  const playlistLink = req.query.playlistLink || null;

  const response = await fetch(playlistLink, {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const allTracks = await response.json();

  const requiredData = allTracks.tracks.items.map((item) => ({
    id: item.track.id,
    name: item.track.name,
    popularity: item.track.popularity,
    coverImage:
      item.track.album.images[0] != undefined
        ? item.track.album.images[0].url
        : "",
    coverImage:
      item.track.album.images[0] != undefined
        ? item.track.album.images[0].url
        : "",
    artist: item.track.artists[0].name,
  }));
  return res.json(requiredData);
});

app.get("/getTrackFeatures", async (req, res) => {
  const accessToken = req.query.accessToken || null;
  const songId = req.query.songId || null;

  const response = await fetch(
    `https://api.spotify.com/v1/audio-features/${songId}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const features = await response.json();

  const requiredFeatures = {
    danceability: features.danceability,
    energy: features.energy,
    loudness: features.loudness,
    speechiness: features.speechiness,
    acousticness: features.acousticness,
    instrumentalness: features.instrumentalness,
    liveness: features.liveness,
    valence: features.valence,
  };

  return res.json(requiredFeatures);
});

app.get("/getTopTracks", async (req, res) => {
  try {
    const accessToken = req.query.code || null;
    const timeRange = req.query.timeframe || null;

    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const requiredData = data.items.map((item) => ({
        id: item.id,
        name: item.name,
        coverImage:
          item.album.images[0] != undefined ? item.album.images[0].url : "",
        genres: item.genres,
        preview: item.preview_url,
      }));

      return res.json(requiredData);
    }
  } catch (error) {
    console.log("Couldn't get top tracks" + error);
  }
});

app.get("/getTopArtists", async (req, res) => {
  try {
    const accessToken = req.query.code || null;
    const timeRange = req.query.timeframe || null;
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    const data = await response.json();
    const requiredData = data.items.map((item) => ({
      id: item.id,
      name: item.name,
      coverImage: item.images[0].url,
      genres: item.genres,
      popularity: item.popularity,
    }));

    return res.json(requiredData);
  } catch (error) {
    console.log("Couldn't get top artists");
  }
});

app.get("/getCurrentTrackMood", async (req, res) => {
  try {
    const accessToken = req.query.code || null;
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const data = await response.json();
    const requiredData = {
      id: data.item.album.id,
      name: data.item.album.name,
      coverImage: data.item.album.images[0].url,
    };
    return res.json(requiredData);
  } catch (error) {
    console.log("Couldn't get the currently playing track" + error);
  }
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
