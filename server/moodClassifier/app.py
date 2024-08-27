from flask import Flask
from views import views
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(views, url_prefix="/")
CORS(app, resources={r"/*": {"origins": "*"}}) #http://127.0.0.1:3000

if __name__=='__main__':
    app.run(debug=True,port=8000)