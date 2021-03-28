from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse

from .db_utils import *
from datetime import datetime, timedelta

class GetUserTools(Resource):
    def get(self, username):
        sql = """
            SELECT barcode, name, description, tool_owner, purchase_price, shareable
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
