from flask import Flask
from flask_restful import Resource, Api

from api.db_utils import *
from api.userApi import *

app = Flask(__name__)  # create Flask instance

api = Api(app)  # api routerep

api.add_resource(LoginUser,'/login/<string:username>/<string:password>')
api.add_resource(CreateUser,'/createUser/')

if __name__ == '__main__':
    print("Starting flask");
    app.run(debug=True),  # starts Flask
