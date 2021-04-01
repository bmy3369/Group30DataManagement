from flask import Flask
from flask_restful import Resource, Api

from api.db_utils import *
from api.userApi import *
from api.toolApi import *

app = Flask(__name__)  # create Flask instance

api = Api(app)  # api routerep

api.add_resource(LoginUser, '/login/<string:username>/<string:password>')
api.add_resource(CreateUser, '/createUser/')
api.add_resource(CreateTool, '/createTool/')
api.add_resource(GetUserTools, '/getTools/<string:username>')
api.add_resource(GetUserRequests, '/getRequests/<string:username>')
api.add_resource(GetUserLentTools, '/getLentTools/<string:username>')
api.add_resource(GetUserBorrowedTools, '/getBorrowedTools/<string:username>')
api.add_resource(AcceptTool, '/acceptTool/<string:requested_tool>')
api.add_resource(DenyTool, '/denyTool/<string:requested_tool>')
api.add_resource(ReturnTool, '/returnTool/')
api.add_resource(DeleteTool, '/deleteTool/')

if __name__ == '__main__':
    print("Starting flask");
    app.run(debug=True),  # starts Flask
