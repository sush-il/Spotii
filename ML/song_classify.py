import numpy as np
from sklearn.ensemble import RandomForestClassifier

data_file = np.loadtxt('./song_data/data.csv',delimiter=',',skiprows=1)

#data has following columns in order



# Calculate the indices for splitting
sample_size = int(0.8 * len(data_file))

#split data into training and testing data, skip first column
train_data = data_file[:sample_size,1:]
test_data = data_file[sample_size:,1:]

#the real classification of the test data
train_target_data = data_file[:sample_size,0]
test_target_data = data_file[sample_size:,0]

#make a model and train it
model = RandomForestClassifier()
model.fit(train_data,train_target_data)

#mood, ###speechiness, energy, valence, liveness, instrumentalness, acousticness, danceability
#data = np.array([0.0466	,0.479,	0.913,	0.0703,	0,	0.556, 0.76]).reshape(1,-1)
#label = model.predict(data)
#print(f"Prediction: {label}")




#get the accuracy score from the model
#print(model.score(test_data,test_target_data))


"""3	0.384	0.0485	0	0.137	0.467	0.00018	0.893
3	0.666	0.128	0	0.081	0.776	0.0622	0.78
1	0.103	0.778	0.711	0.827	0.0897	0	0.0273
4	0.0272	0.245	0.286	0.109	0.534	0.862	0.686
2	0.348	0	0.965	0.0889	0.0565	0.0534	0.71"""
