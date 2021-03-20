from flask import Flask
from flask_restful import Resource, Api

from api.userApi import *
from api.borrowApi import *
from api.toolApi import *

from api.db_utils import *

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(CreateUser, '/createUser/<String username>/<String password>')


if __name__ == '__main__':
    print("Starting flask");
    app.run(debug=True), #starts Flask
