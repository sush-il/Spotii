# mood classified into happy, sad, energetic and calm
from views import *
import csv


##############################################################################################

playlist_ids = ['37i9dQZF1DX0vHZ8elq0UK','37i9dQZF1DWZVAVMhIe3pV','37i9dQZF1EIeLflS1D0w73','37i9dQZF1EIhQBSkQRcBti']
def cdata(playlist_id):
    print(playlist_id)
    sp_oauth = authorise_app()
    code = request.args.get('code')   
    token_info = sp_oauth.get_access_token(code)
    sp = spotipy.Spotify(auth=token_info['access_token'])
    
    #happy playlists -> ['37i9dQZF1DXdPec7aLTmlC','37i9dQZF1DX7KNKjOK0o75','37i9dQZF1DWYBO1MoTDhZI','37i9dQZF1DX3rxVfibe1L0']
    #sad playlists -> ['37i9dQZF1DX7qK8ma5wgG1','37i9dQZF1DWZUAeYvs88zc','37i9dQZF1DX64Y3du11rR1','37i9dQZF1DX3YSRoSdA634']
    #calm / chill -> ['37i9dQZF1EIhnGUyOEDCHI','3c3zGZPJYp3thJ56Z2TB60','7hJfYpKLDQwmeHIPTmNS5y','37i9dQZF1EIg1vGkod69Rl','4p95kpslEQ0PhjaeHPmqoD']
    #energy -> ['37i9dQZF1DX0vHZ8elq0UK','37i9dQZF1DWZVAVMhIe3pV','37i9dQZF1EIeLflS1D0w73','37i9dQZF1EIePEQ2DuBKTK','37i9dQZF1EIfj3CnQuzQuQ']

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
        extracted.append({key: item[key] for key in ['danceability','energy','speechiness','acousticness','instrumentalness','liveness','valence']})

    load_to_csv(extracted,'energy_songs.csv')

    return 

def load_to_csv(data,filename):
    keys = data[0].keys()

    with open(filename,'a',newline='') as csvfile:
        writer = csv.DictWriter(csvfile,fieldnames = keys)
        writer.writeheader()
        writer.writerows(data) 