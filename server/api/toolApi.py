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