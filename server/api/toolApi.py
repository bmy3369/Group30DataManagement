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
        parser.add_argument('date_required', type=str)
        parser.add_argument('status', type=str)
        args = parser.parse_args()

        date_required = args['date_required']
        sql = """
                            UPDATE request 
                            SET status = 'Accepted' SET date_required = date_required
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
    def post(self, username, requested_tool):
        sql = """
                    DELETE from request
                    where username = %s and requested_tool = %s
                    """
        exec_commit(sql, (date_required, username, requested_tool))
