from flask import Blueprint, request, jsonify
from moodClassifier import get_mood

views = Blueprint(__name__, "views")

@views.route("/mood", methods=['POST'])
def mood():
    current_track_features = request.get_json()
    
    if not current_track_features:
        return jsonify({"error": "No Track Features Received"}), 400  # Return 400 for bad request

    try:
        # Get the classification for the song
        mood_value = get_mood(current_track_features)

    except Exception as e:
        return jsonify({"error": "Error processing mood classification"}), 500  # Return 500 for server error

    # Define mood and message based on the mood_value
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
        return jsonify({"error": "Invalid mood classification"}), 400  # Handle unexpected mood_value

    # Add the classification and message to the track info
    current_track = {
        'mood': mood,
        'message': message
    }

    return jsonify(current_track), 200  # Explicitly return 200 for success
