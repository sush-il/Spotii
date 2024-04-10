# Spotii

Spotii is a Spotify Music Analyzer application that integrates with the Spotify API to provide users with information about their playlists, top artists, and top tracks.

## Features
**User Authentication**: The application allows users to authenticate with their Spotify account, granting access to their playlists, top artists, and top tracks.

**Playlist Exploration**: Users can view their playlists and access detailed information about each playlist, including the list of songs, total tracks, and other relevant details.

**Track Details**: Clicking on a track within a playlist provides users with comprehensive information about that track, including audio features such as danceability, energy, and valence, represented as a graph.

**Artist Information**: Clicking on an artist allows users to explore detailed information about the artist such as their popularity and genre. 

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
**React**: The library used for front-end development.
**Express**: Web framework used for building the server and handling HTTP requests.
**Spotify API**: The Spotify API is utilized to retrieve user-specific data, including playlists, top artists, and top tracks.
**Chart JS**: A JavaScript library used for data visualization. Chart.js is employed to create interactive and visually appealing graphs representing audio features.

## Contributing
Contributions to the Spotify Music Analyzer project are welcome. If you find any bugs, have suggestions for improvements, or would like to add new features, please submit an issue or create a pull request in the repository.

When contributing, please follow the existing code style, add tests for new functionality, and ensure that your changes do not break existing features.

## Acknowledgements
The Spotify Music Analyzer was developed by Sushil Bhandari for personal learning purposes.
The application utilizes the Spotify API, which provides the necessary data for playlist, artist, and track information.
The mood classification algorithm is based on the Random Forest machine learning algorithm and uses pre-collected data from labeled Spotify playlists.
Please credit and acknowledge the original authors and data sources when reusing or referencing the Spotify Music Analyzer project.


##### Issue: Performance optimization for the website

I wanted to bring to your attention that I've noticed some room for improvement in terms of website performance. While the website is fully functional, I believe there are opportunities to enhance its speed and responsiveness.

<img src="https://github.com/sush-il/Spotii/assets/34659821/f20829e5-69d8-41a5-af1d-7a69f3338d5d" width="500" alt="image">
<img src="https://github.com/sush-il/Spotii/assets/34659821/fa2587f5-e4e2-45c1-919b-33bb727257dd" width="500" alt="image">
<img src="https://github.com/sush-il/Spotii/assets/34659821/f8880524-bffd-4e99-878a-bd59f0669e97" width="500" alt="image">
<img src="https://github.com/sush-il/Spotii/assets/34659821/d780cebc-9c4c-426e-9e7a-1dc5b1e22bb0" width="500" alt="image">


















# spoti

###### So far this is what i've learnt
###### we got to login url which redirects us to spotify authrize page with the given credentials and scope
###### This returns a code which can be used to get the acess token; code is in the url
###### we grab the code from the url
###### set credentials such as form, headers and authOptions; and use this to make a most request 
###### Once the post request is made we get back the access token and refresh token


##### So how i did it is with a button that goes to the calls the server port at /login 
##### The login redirects user to frontend (different port) with the auth code
##### The authcode is to receive the access token from the server
##### The access token is returned to the frontend. While trying to fetch data the access token is passed through the server port url as a param 
##### We access the access token from the url in the serer and use it get any data; then the data is passed back to the front end to be displayed

#### One of the big problem that i had at one point was the useEffect was doing a re-render automatically; was mounting twice for some reason on the homepage
#### This meant although all the data would load; the data (access token) we received from the server instantly became unusuable (it held the error, since the code used to get the token expired). 
#### The only solution i could think of was to actually remove the code from url after the first fetch; since code was now null access token fetch couldn't happen
