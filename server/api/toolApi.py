from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse

from .db_utils import *

from datetime import datetime, timedelta


class GetUserTools(Resource):
    def get(self, username):
        sql = """
            SELECT barcode, name, description 
            FROM tools
            WHERE tool_owner = %s
            """
        return list(exec_get_all(sql, [username]))


class CreateTool(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('description', type=str)
        parser.add_argument('purchase_date', type=str)
        parser.add_argument('purchase_price', type=str)
        parser.add_argument('shareable', type=bool)
        parser.add_argument('owner', type=str)
        args = parser.parse_args()

        tool_name = args['name']
        description = args['description']
        purchase_date = datetime.today()
        purchase_price = args['purchase_date']
        shareable = args['shareable']
        owner = args['owner']
        sql = """
                    INSERT INTO tools (name, description, tool_owner, purchase_price, purchase_date, shareable)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
        exec_commit(sql, (tool_name, description, owner, purchase_price, purchase_date, shareable))


class GetUserRequests(Resource):
    def get(self, username):
        sql = """
                    SELECT username, requested_tool, duration
                    FROM request
                    WHERE tool_owner = %s and status = 'Pending'
                    """
        return list(exec_get_all(sql, [username]))


class AcceptTool(Resource):
    def post(self, requested_tool, username):
        sql = """
                            UPDATE request 
                            SET status = 'Accepted'
                            WHERE requested_tool = %s AND username = %s
                        """
        exec_commit(sql, (requested_tool, username))

class DenyTool(Resource):
    def post(self, requested_tool, username):
        sql = """
                            UPDATE request 
                            SET status = 'Denied'
                            WHERE requested_tool = %s AND username = %s
                        """
        exec_commit(sql, (requested_tool, username))


class GetUserLentTools(Resource):
    def get(self, username):
        sql = """
                    SELECT username, requested_tool, duration
                    FROM request
                    WHERE tool_owner = %s
                    AND status = 'Accepted'
                    """
        return list(exec_get_all(sql, [username]))


class GetUserBorrowedTools(Resource):
    def get(self, username):
        sql = """
                    SELECT tool_owner, requested_tool, duration
                    FROM request
                    WHERE username = %s
                    """
        return list(exec_get_all(sql, [username]))



# In progress
class ReturnTool(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str)
        parser.add_argument('tool', type=str)

        tool_owner = args['username']
        tool_requested = int(args['tool'])
        sql = """
                    DELETE FROM request
                    WHERE tool_owner = %s AND requested_tool = %d
                    """
        exec_commit(sql, (tool_owner, tool_requested))


class DeleteTool(Resource):
    def post(self, tool):
        sql = """ 
        
                    DELETE FROM request
                    WHERE requested_tool = %s;                            
                                    
                    DELETE FROM tools 
                    WHERE barcode = %s;                
                                """
        exec_commit(sql, [tool, tool])

class AvailableTools(Resource):
    def get(self, username):
        sql = """
            SELECT barcode, name, description 
            FROM tools
            WHERE tool_owner <> %s
            AND barcode NOT IN
                (
                SELECT requested_tool
                FROM request
                WHERE status <> 'Accepted'
                )
            """
        return list(exec_get_all(sql, [username]))
