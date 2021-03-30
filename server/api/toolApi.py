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
                    SELECT username, requested_tool, duration, status
                    FROM request
                    WHERE tool_owner = %s and status = 'Pending'
                    """
        return list(exec_get_all(sql, [username]))