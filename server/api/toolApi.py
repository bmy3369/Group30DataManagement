from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse

from .db_utils import *


class GetUserTools(Resource):
    def get(self, username):
        sql = """
            SELECT barcode, name, description 
            FROM tools
            WHERE tool_owner = %s
            """
        return list(exec_get_all(sql, [username]))


class GetUserRequests(Resource):
    def get(self, username):
        sql = """
                    SELECT username, requested_tool, duration
                    FROM request
                    WHERE tool_owner = %s and status = 'Pending'
                    """
        return list(exec_get_all(sql, [username]))


class AcceptTool(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('tool', type=str)
        parser.add_argument('status', type=str)
        args = parser.parse_args()

        tool = args['tool']
        sql = """
                            UPDATE request 
                            SET status = 'Accepted'
                            WHERE requested_tool = tool
                        """
        exec_commit(sql, (date_required, status, date_required))


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
