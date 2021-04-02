from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse

from .db_utils import *

from datetime import date, datetime, timedelta


class GetUserTools(Resource):
    def get(self, username):
        sql = """
                SELECT barcode, name, description, tool_owner, purchase_price, shareable
                FROM tools
                WHERE tool_owner = %s
                ORDER BY name 
                """
        return list(exec_get_all(sql, [username]))



class EditTool(Resource):
    def put(self, barcode):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('description', type=str)
        parser.add_argument('purchase_date', type=str)
        parser.add_argument('purchase_price', type=str)
        args = parser.parse_args()

        tool_name = args['name']
        description = args['description']
        purchase_date = datetime.today()
        purchase_price = args['purchase_price']

        sql = """
            UPDATE tools
            SET name = %s, description = %s, purchase_date = %s, purchase_price = %s
            WHERE barcode = %s
        """
        exec_commit(sql, (tool_name, description, purchase_date, purchase_price, barcode))


class GetToolCategories(Resource):
    def get(self, barcode):
        sql = """
            SELECT category_type
            FROM categories
            WHERE barcode = %s
        """
        return list(exec_get_all(sql, [barcode]))


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
        purchase_price = args['purchase_price']
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
                    SELECT username, requested_tool, date_required, duration
                    FROM request
                    WHERE tool_owner = %s
                    AND status = 'Accepted'
                    ORDER BY date_required asc
                    """
        return list(exec_get_all(sql, [username]))


class GetUserBorrowedTools(Resource):
    def get(self, username):
        sql = """
                    SELECT tool_owner, requested_tool, date_required, duration
                    FROM request
                    WHERE username = %s
                    AND status = 'Accepted'
                    ORDER BY date_required asc
                    """
        return list(exec_get_all(sql, [username]))


class ReturnTool(Resource):
    def post(self, tool_owner, tool_requested, username):
        sql = """
                    DELETE FROM request
                    WHERE tool_owner = %s AND requested_tool = %s;
                    
                    INSERT INTO returned_tool (barcode, username, date_returned)
                    VALUES (%s, %s, %s)
                    """
        date_returned = date.today()
        exec_commit(sql, (tool_owner, tool_requested, tool_requested, username, date_returned))


class DeleteTool(Resource):
    def post(self, tool):
        sql = """ 
        
                    DELETE FROM request
                    WHERE requested_tool = %s;                            
                                    
                    DELETE FROM tools 
                    WHERE barcode = %s;                
                                """
        exec_commit(sql, [tool, tool])
