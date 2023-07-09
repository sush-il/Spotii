import numpy as np
from sklearn.ensemble import RandomForestClassifier

def get_mood(data):
    data_file = np.loadtxt('./song_data/data.csv',delimiter=',',skiprows=1)

    #data file has following columns in order
    #['mood','danceability','energy','speechiness','acousticness','instrumentalness','liveness','valence']

    # Calculate the indices for splitting
    sample_size = int(1 * len(data_file))

    #split data into training and testing data, skip first column
    train_data = data_file[:sample_size,1:]
    #test_data = data_file[sample_size:,1:]

    #the real classification of the test data
    train_target_data = data_file[:sample_size,0]
    #test_target_data = data_file[sample_size:,0]

    #make a model and train it
    model = RandomForestClassifier()
    model.fit(train_data,train_target_data)

    #get the accuracy score from the model
    #print(model.score(test_data,test_target_data))
    
    extracted = []
    for item in data:
        #['mood','danceability','energy','speechiness','acousticness','instrumentalness','liveness','valence']
        extracted.append({key: item[key] for key in ['danceability','energy','speechiness','acousticness','instrumentalness','liveness','valence']})
    
    data = np.array(list(extracted[0].values())).reshape(1,-1) #extract values from the song and turn it to a numpy array
    label = model.predict(data) #make a prediction from the values
    return int(label[0])