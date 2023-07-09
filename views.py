from ast import literal_eval #convert string to dictionary
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import request, Blueprint, render_template, redirect, url_for
import song_classify as ml
from dotenv import load_dotenv
import os


views = Blueprint(__name__,"views")
load_dotenv()
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
redirect_uri = os.getenv('REDIRECT_URI')

# get data for the home page
@views.route("/")
def home():
    sp_oauth = authorise_app()
    code = request.args.get('code')   
    token_info = sp_oauth.get_access_token(code)
    sp = spotipy.Spotify(auth=token_info['access_token'])

    context = {'playlist': get_playlists(sp),
               'artists': get_top_artists(sp),
               'tracks': get_top_tracks(sp)
               }

    return render_template('main/index.html',context = context)

# return tracks or playlist for selected time range
@views.route("/extra", methods=['POST'])
def get_extras():
    sp_oauth = authorise_app()
    code = request.args.get('code')   
    token_info = sp_oauth.get_access_token(code)
    sp = spotipy.Spotify(auth=token_info['access_token'])
    
    info = request.form.get('extras').split(',')

    identifier = info[0] #playlist / track / artist
    time_range = info[1] #short, medium, long term
    context = {}
    
    if identifier == 'artists':
        context = {'identifier':'artists', 'obj':get_top_artists(sp, time_range = time_range)}
    elif identifier == 'tracks':
        context = {'identifier':'tracks','obj':get_top_tracks(sp, time_range = time_range)}
    elif identifier == 'playlists':
        context = {'identifier':'playlists', 'obj':get_playlists(sp)}

    return render_template('main/extra.html', context = context)

# get details about playlists, tracks or artists
@views.route("/details",methods=['POST'])
def get_details():
    context = request.form.get('details').split(',',1) #split by , only on the first instance
    data_type = context[0]
    data = literal_eval(context[1]) #literal_eval converts string to python code

    if data_type == 'playlists':
        return render_template('main/playlist-details.html',context = data)
    elif data_type == 'artists':
        return render_template('main/artist-details.html',context = data)
    elif data_type == 'tracks':
        return render_template('main/track-details.html',context = data)
        
    return render_template('main/error.html')

# get all user playlists and details of all tracks in the playlist
def get_playlists(sp):
    all_playlists = sp.current_user_playlists(limit=30,offset=0)['items']
    playlist_info = []

    for playlist in all_playlists:
        playlist_id = playlist['id']
        info = {
                'id':playlist_id,
                'name':playlist['name'],
                'cover': playlist['images'][0]['url'],
                'total_tracks':playlist['tracks']['total'],
                'songs': [
                        {
                            'id':song['track']['id'],
                            'name': song['track']['name'],
                            'cover':song['track']['album']['images'],
                            'artists':song['track']['artists'],
                            'genres':sp.audio_features(tracks=[song['track']['id']])
                        } 
                        for song in sp.playlist_tracks(playlist_id, additional_types=('track', ))['items']
                        ]
                }
        playlist_info.append(info)
    return playlist_info


# get the users top artists
def get_top_artists(sp, time_range = 'medium_term'):
    top_artists = sp.current_user_top_artists(limit=30,time_range = time_range)['items']
    artist_info = []

    for artist in top_artists:
        info = {
            'id':artist['id'],
            'name':artist['name'],
            'genres':artist['genres'],
            'cover':artist['images'][0]['url'],
            'popularity':artist['popularity']
        }
        
        artist_info.append(info)

    
    
    return artist_info

# return the users top tracks
def get_top_tracks(sp, time_range='medium_term'):
    top_tracks = sp.current_user_top_tracks(limit=30, time_range= time_range)['items']
    track_info = []

    for track in top_tracks:
        info = {
            'id':track['id'],
            'name':track['name'],
            'artists':track['artists'],
            'cover':track['album']['images'][0]['url'],
            'genres':sp.audio_features(tracks=[track['id']])
        }
        track_info.append(info)

    return track_info

def authenticate():
    sp_oauth = authorise_app()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(url_for(auth_url))

def authorise_app():
    scope = "user-library-read user-top-read user-read-currently-playing"
    return SpotifyOAuth(
            client_id=client_id,
            client_secret=client_secret,
            redirect_uri=redirect_uri,
            scope=scope
        )
# user-read-currently-playing
#----------------------------------------------------

@views.route("/mood")
def mood():
    sp_oauth = authorise_app()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    access_token = token_info['access_token']

    # Create a new Spotipy client
    sp = spotipy.Spotify(auth=access_token)

    # Get the current playing track
    current_track = sp.current_user_playing_track()

    #check if a song is currently playing
    if current_track == None:
        context = {'mood':None,'message':"Make sure that you're playing a song on spotify for this to work."}
        return render_template("main/mood.html",context=context)
    
    current_track = sp.current_user_playing_track()['item']
    current_track['features'] =  sp.audio_features(tracks=current_track['id'])

    #get the classification for the song
    mood_value = ml.get_mood(current_track['features'])

    if mood_value == 1:
        mood = "Happy"
        message = "I'm glad you're feeling like this."
    elif mood_value == 2:
        mood = "Sad"
        message = "It's OK! You don't have to cry alone."
    elif mood_value == 3:
        mood = "Energetic"
        message = "Might as well get up and hit the floor."
    elif mood_value == 4:
        mood = "Calm"
        message = "This is the vibe!"
    else:
        mood = ""
        message = "Make sure that you're playing a song on spotify for this to work."
    
    #add the classification and message to the track info
    current_track['mood'] = mood
    current_track['message'] = message

    return render_template("main/mood.html",context=current_track)

    """if mood_value == 1:
        mood = "HAPPY"
    elif mood_value == 2:
        mood = "SAD"
    elif mood_value == 3:
        mood = "ENERGETIC"    
    elif mood_value == 4:
        mood = "CALM"
    else:
        mood = "NONE"""

##############################################################################################
       
