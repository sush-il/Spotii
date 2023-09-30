# Spotii

Spotii is a Flask Spotify Music Analyzer application that integrates with the Spotify API to provide users with information about their playlists, top artists, and top tracks. Additionally, it offers a feature to analyze the mood of the currently playing music using a machine learning algorithm called Random Forest.

## Features
**User Authentication**: The application allows users to authenticate with their Spotify account, granting access to their playlists, top artists, and top tracks.

**Playlist Exploration**: Users can view their playlists and access detailed information about each playlist, including the list of songs, total tracks, and other relevant details.

**Track Details**: Clicking on a track within a playlist provides users with comprehensive information about that track, including audio features such as danceability, energy, and valence, represented as a graph.

**Artist Information**: Clicking on an artist allows users to explore detailed information about the artist such as their popularity and genre. 

**Mood Analysis**: The application employs a machine learning algorithm, specifically Random Forest, to classify the mood of currently playing music. This classification is based on pre-collected data from Spotify playlists that have been labeled as happy, sad, calm, or energetic.

## Usage
To access the Spotify Music Analyzer, follow these steps:

- Visit the deployed application's URL https://spotii.onrender.com.
- You will be prompted to log in with your Spotify account.
- Once logged in, you will have access to your playlists, top artists, and top tracks.
- To analyze the mood of the currently playing music, navigate to the Mood Analysis section and follow the instructions provided.

## Installation
If you would like a local installation of the project follow these steps:

- Clone the repository: git clone https://github.com/sush-il/Spotii.git
- Navigate to the project directory and create a virtual environment: python3 -m venv venv
- Activate the virtual environment
- Install the required dependencies: pip install -r requirements.txt
- Set up your Spotify Developer account and create a new application to obtain client id and client secret.
- Create a .env file in the project's root directory and add the following information:
    - CLIENT_ID = add client id
    - CLIENT_SECRET = add client secret
    - REDIRECT_URI = add redirect uri (must be same as the one in spotify developers account)

- Run the Flask development server: python app.py

## Technologies Used
**Python**: The core programming language used to develop the application.
**Flask**: A lightweight web framework used for building the application and handling HTTP requests.
**Spotify API**: The Spotify API is utilized to retrieve user-specific data, including playlists, top artists, and top tracks.
**Machine Learning**: The Random Forest algorithm is used to classify the mood of currently playing music based on pre-collected labeled data from Spotify playlists.
**HTML/CSS**: The front-end of the application is built using HTML and styled with CSS for an interactive and visually appealing user interface.
**Chart JS**: A JavaScript library used for data visualization. Chart.js is employed to create interactive and visually appealing graphs representing audio features.

## Contributing
Contributions to the Spotify Music Analyzer project are welcome. If you find any bugs, have suggestions for improvements, or would like to add new features, please submit an issue or create a pull request in the repository.

When contributing, please follow the existing code style, add tests for new functionality, and ensure that your changes do not break existing features.

## Acknowledgements
The Spotify Music Analyzer was developed by Sushil Bhandari for personal learning purposes.
The application utilizes the Spotify API, which provides the necessary data for playlist, artist, and track information.
The mood classification algorithm is based on the Random Forest machine learning algorithm and uses pre-collected data from labeled Spotify playlists.
Please credit and acknowledge the original authors and data sources when reusing or referencing the Spotify Music Analyzer project.


Issue: Performance optimization for the website
I wanted to bring to your attention that I've noticed some room for improvement in terms of website performance. While the website is fully functional, I believe there are opportunities to enhance its speed and responsiveness.
