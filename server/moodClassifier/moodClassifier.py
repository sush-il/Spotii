import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib  # for saving and loading the model

def get_mood(data):    
    # Load the dataset
    data_file = np.loadtxt('./data.csv', delimiter=',', skiprows=1)

    # Columns: ['mood', 'danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence']
    
    # Split data into features and target
    X = data_file[:, 1:]  # Features
    y = data_file[:, 0]   # Target (mood)


    model = RandomForestClassifier()
    model.fit(X, y)
    
    # Extract relevant features from input data
    features = np.array([
        data['danceability'],
        data['energy'],
        data['speechiness'],
        data['acousticness'],
        data['instrumentalness'],
        data['liveness'],
        data['valence']
    ]).reshape(1, -1)  # Reshape for prediction

    # Predict mood
    label = model.predict(features)
    
    return int(label[0])

