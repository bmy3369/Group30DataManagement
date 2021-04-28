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
api.add_resource(ReturnTool, '/returnTool/<string:tool_owner>/<string:tool_requested>/<string:username>'
                             '/<string:duration>')
api.add_resource(AcceptTool, '/acceptTool/<string:requested_tool>/<string:username>')
api.add_resource(DenyTool, '/denyTool/<string:requested_tool>/<string:username>')
api.add_resource(DeleteTool, '/deleteTool/<string:tool>')
api.add_resource(AvailableTools, '/getAvailableTools/<string:username>')
api.add_resource(RequestTool, '/requestTool/<string:requested_tool>/<string:username>/<string:tool_owner>')
api.add_resource(GetUserOutgoing, '/getOutgoing/<string:username>')
api.add_resource(CancelRequest, '/cancelRequest/<string:requested_tool>/<string:username>')
api.add_resource(EditTool, '/editTool/<string:barcode>')
api.add_resource(GetToolCategories, '/getToolCategories/<string:barcode>')
api.add_resource(RemoveCategoryFromTool, '/removeToolCategory/<string:barcode>/<string:type>')
api.add_resource(AddCategoryToTool, '/addToolCategory/<string:barcode>/<string:type>')
api.add_resource(GetLastTool, '/getLastTool/<string:username>')
api.add_resource(SearchForCategories, '/searchCategory/<string:username>/<string:category>')
api.add_resource(SearchForBarcodes, '/searchBarcode/<string:username>/<string:barcode>')
api.add_resource(SearchForNames, '/searchName/<string:username>/<string:name>')
api.add_resource(SearchForAvailableCategories, '/searchAvailableCategory/<string:username>/<string:category>')
api.add_resource(SearchForAvailableBarcodes, '/searchAvailableBarcode/<string:username>/<string:barcode>')
api.add_resource(SearchForAvailableNames, '/searchAvailableName/<string:username>/<string:name>')
api.add_resource(Top10Borrowed, '/getTopBorrowed/<string:username>')
api.add_resource(Top10Lent, '/getTopLent/<string:username>')
api.add_resource(GetRecommendation, '/getRecommended/<string:username>/<string:requested_tool>')


if __name__ == '__main__':
    print("Starting flask")
    app.run(debug=True),  # starts Flask
