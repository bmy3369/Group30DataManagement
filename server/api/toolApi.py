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
    def post(self, requested_tool):
        sql = """
                            UPDATE request 
                            SET status = 'Accepted'
                            WHERE requested_tool = %s
                        """
        exec_commit(sql, (requested_tool,))


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
