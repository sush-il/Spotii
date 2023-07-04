# mood classified into happy, sad, energetic and calm
from views import *

playlist_id = "37i9dQZF1DWURugcFfOfEH"

def cdata():
    sp_oauth = authorise_app()
    code = request.args.get('code')   
    token_info = sp_oauth.get_access_token(code)
    sp = spotipy.Spotify(auth=token_info['access_token'])

    feat = sp.audio_features(tracks=[])

print(cdata())


"""@views.route("/chart")
def cdata():
    sp_oauth = authorise_app()
    code = request.args.get('code')   
    token_info = sp_oauth.get_access_token(code)
    sp = spotipy.Spotify(auth=token_info['access_token'])

    playlist_id = "37i9dQZF1DX0vHZ8elq0UK" 
    #happy playlists -> #37i9dQZF1DXcx7GqrPm7So #37i9dQZF1DWURugcFfOfEH
    #sad playlists -> 37i9dQZF1DX3YSRoSdA634 #37i9dQZF1DX7qK8ma5wgG1
    #calm / chill -> 37i9dQZF1DX5qwHeIGQ14o #37i9dQZF1DXcxacyAXkQDu
    #energy -> #37i9dQZF1EIgkasIW2Ah8A #37i9dQZF1DX0vHZ8elq0UK
    songs = [
                {
                    'id':song['track']['id'],
                    'name': song['track']['name'],
                    'genres':sp.audio_features(tracks=[song['track']['id']])
                } 
                for song in sp.playlist_tracks(playlist_id, additional_types=('track', ))['items']
            ]
    
    genres = [song['genres'][0] for song in songs]
    extracted = []
    for item in genres:
        extracted.append({key: item[key] for key in item.keys()&{'danceability','energy','speechiness','acousticness','instrumentalness','liveness','valence'}})

    load_to_csv(extracted,'energy_songs.csv')

    return extracted

    

def load_to_csv(data,filename):
    keys = data[0].keys()

    with open(filename,'a',newline='') as csvfile:
        writer = csv.DictWriter(csvfile,fieldnames = keys)
        writer.writeheader()
        writer.writerows(data)"""