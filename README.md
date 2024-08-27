# Spotii

Spotii is a Spotify Music Analyzer application that integrates with the Spotify API to provide users with information about their playlists, top artists, and top tracks.

## Features

**User Authentication**: The application allows users to authenticate with their Spotify account, granting access to their playlists, top artists, and top tracks.

**Playlist Exploration**: Users can view their playlists and access detailed information about each playlist, including the list of songs, total tracks, and other relevant details.

**Track Details**: Clicking on a track within a playlist provides users with comprehensive information about that track, including audio features such as danceability, energy, and valence, represented as a graph.

**Artist Information**: Clicking on an artist allows users to explore detailed information about the artist such as their popularity and genre.

**Mood Classification**: For an track playing in the connected account the system will identify the mood of the given song from Happy, Sad, Energetic and Calm.

## Installation

If you would like a local installation of the project follow these steps:

- Clone the repository: git clone https://github.com/sush-il/Spotii.git
- Navigate to the project directory and run `npm install` on the terminal to install all dependencies
- Set up your Spotify Developer account and create a new application to obtain client id and client secret.
- Create a .env file in the project's server directory and add the following information:

  - `CLIENT_ID = ...`
  - `CLIENT_SECRET = ...`
  - `REDIRECT_URI = ...` (must be same as the one in spotify developers account)

- Run the client and server
  - `npm start` (for the client)
  - `npm run dev` (for the server)

## Technologies Used

**React**: The library used for front-end development. <br />
**Express**: Web framework used for building the server and handling HTTP requests. <br />
**Spotify API**: The Spotify API is utilized to retrieve user-specific data, including playlists, top artists, and top tracks. <br />
**Chart JS**: A JavaScript library used for data visualization. Chart.js is employed to create interactive and visually appealing graphs representing audio features.
**Flask**: As a backend for mood classification. <br />
**Scikit-learn**: Machine Learning framework.
<br />

<img src="https://github.com/sush-il/Spotii/assets/34659821/f20829e5-69d8-41a5-af1d-7a69f3338d5d" width="500" alt="image">
<img src="https://github.com/sush-il/Spotii/assets/34659821/fa2587f5-e4e2-45c1-919b-33bb727257dd" width="500" alt="image">
<img src="https://github.com/sush-il/Spotii/assets/34659821/f8880524-bffd-4e99-878a-bd59f0669e97" width="500" alt="image">
<img src="https://github.com/sush-il/Spotii/assets/34659821/d780cebc-9c4c-426e-9e7a-1dc5b1e22bb0" width="500" alt="image">
<img src="https://github.com/user-attachments/assets/27398367-a06a-4ba9-a57e-95152a842b42"        width="500" alt="mood page">


## What I learned from this project

<details>
  <summary><strong>OAuth 2.0 Authentication Processes through Spotify</strong></summary>

1. **Login Process:**

   - On entering the homepage redirect users to Spotify authorization page with the provided credentials and scopes.
   - After authorization, Spotify redirects users back to our application with an authorization code included in the URL.

2. **Fetching Access Token:** - Our server receives the authorization code and exchanges it for an access token by making a POST request. - The server then retrieves the access token and a refresh token.
</details>

<details>
  <summary><strong>Storage Mechanisms</strong></summary>
    I learned about various storage mechanisms such as localStorage, sessionStorage & cookies. I used sessions to manage access tokens for authentication in my project. 
    Sessions provide a convenient way to store user authentication state across multiple requests without exposing sensitive information like access tokens directly in URLs or local storage. 
</details>

## Problems faced

<details>
  <summary><strong>Handling access token</strong></summary>
    I encountered issues with page re-render in the frontend which meant the access token immediately became inaccessable.
    To address this, I decided to remove the authorization code from the URL after the first fetch to prevent re-use of expired code which prevented re-fetch from the server.
</details>

<br />

<div style="color:grey;">
    <h3> Contributing </h3>
    <p>
        Contributions to the Spotify Music Analyzer project are welcome. 
        If you find any bugs, have suggestions for improvements, or would like to add new features, please submit an issue or create a pull request in the repository.
        When contributing, please follow the existing code style, add tests for new functionality, and ensure that your changes do not break existing features.   
    </p>
    <h3> Acknowledgements </h3>
    <p> 
        The Spotify Music Analyzer was developed by Sushil Bhandari for personal learning purposes.
        The application utilizes the Spotify API, which provides the necessary data for playlist, artist, and track information.
        The mood classification algorithm is based on the Random Forest machine learning algorithm and uses pre-collected data from labeled Spotify playlists.
        Please credit and acknowledge the original authors and data sources when reusing or referencing the Spotify Music Analyzer project.
    </p>
</div>
