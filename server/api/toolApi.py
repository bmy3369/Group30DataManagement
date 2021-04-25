from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse

from .db_utils import *

from datetime import date, datetime, timedelta


class GetUserTools(Resource):
    def get(self, username):
        sql = """
                SELECT barcode, name, description, purchase_date, purchase_price, shareable
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
        parser.add_argument('shareable', type=bool)
        args = parser.parse_args()

        tool_name = args['name']
        description = args['description']
        purchase_date = args['purchase_date']
        purchase_price = args['purchase_price']
        shareable = args['shareable']

        sql = """
            UPDATE tools
            SET name = %s, description = %s, purchase_date = %s, purchase_price = %s, shareable = %s
            WHERE barcode = %s
        """
        exec_commit(sql, (tool_name, description, purchase_date, purchase_price, shareable, barcode))

class SearchForAvailableCategories(Resource):
    def get(self, username, category):
        sql = """
            SELECT tool.barcode, tool.name, tool.description, tool.tool_owner
            FROM categories as cats
            INNER JOIN tools as tool on cats.barcode = tool.barcode
            WHERE tool.tool_owner <> %s
            AND cats.category_type = %s
            AND SHAREABLE = true
            AND tool.barcode NOT IN
                (
                SELECT requested_tool
                FROM request
                WHERE status = 'Accepted'
                )
            AND tool.barcode NOT IN
                (
                SELECT requested_tool
                FROM request
                WHERE status = 'Pending'
                AND username = %s
                )
            ORDER BY name
        """
        return exec_get_all(sql, [username, category, username])

class SearchForAvailableBarcodes(Resource):
    def get(self, username, barcode):
        sql = """
            SELECT barcode, name, description, tool_owner
            FROM tools
            WHERE tool_owner <> %s
            AND barcode = %s
            AND SHAREABLE = true
            AND barcode NOT IN
                (
                SELECT requested_tool
                FROM request
                WHERE status = 'Accepted'
                )
            AND barcode NOT IN
                (
                SELECT requested_tool
                FROM request
                WHERE status = 'Pending'
                AND username = %s
                )
                ORDER BY name
        """
        return exec_get_all(sql, [username, barcode, username])

class SearchForAvailableNames(Resource):
    def get(self, username, name):
        sql = """
            SELECT barcode, name, description, tool_owner
            FROM tools
            WHERE tool_owner <> %s
            AND name = %s
            AND SHAREABLE = true
            AND barcode NOT IN
                (
                SELECT requested_tool
                FROM request
                WHERE status = 'Accepted'
                )
            AND barcode NOT IN
                (
                SELECT requested_tool
                FROM request
                WHERE status = 'Pending'
                AND username = %s
                )
            ORDER BY name
        """
        return exec_get_all(sql, [username, name, username])



class SearchForCategories(Resource):
    def get(self, username, category):
        sql = """
            SELECT tool.barcode, tool.name, tool.description, tool.purchase_date, tool.purchase_price, tool.shareable
            FROM categories as cats
            INNER JOIN tools as tool ON cats.barcode = tool.barcode
            WHERE cats.category_type = %s and tool.tool_owner = %s
            ORDER BY name
        """
        return exec_get_all(sql, [category, username])


class SearchForBarcodes(Resource):
    def get(self, username, barcode):
        sql = """
            SELECT barcode, name, description, purchase_date, purchase_price, shareable
            FROM tools
            WHERE barcode = %s and tool_owner = %s
            ORDER BY name
        """
        return exec_get_all(sql, [barcode, username])


class SearchForNames(Resource):
    def get(self, username, name):
        sql = """
            SELECT barcode, name, description, purchase_date, purchase_price, shareable
            FROM tools
            WHERE name = %s and tool_owner = %s
            ORDER BY name
         """
        return exec_get_all(sql, [name, username])


class GetToolCategories(Resource):
    def get(self, barcode):
        sql = """
            SELECT category_type
            FROM categories
            WHERE barcode = %s
        """
        return list(exec_get_all(sql, [barcode]))


class AddCategoryToTool(Resource):
    def post(self, barcode, type):
        sql = """
            INSERT INTO categories (barcode, category_type)
            VALUES(%s, %s)
         """
        exec_commit(sql, (barcode, type))


class RemoveCategoryFromTool(Resource):
    def post(self, barcode, type):
        sql = """
            DELETE FROM categories
            WHERE category_type = %s AND barcode = %s
        """
        exec_commit(sql, (type, barcode))

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
        purchase_date = args['purchase_date']
        purchase_price = args['purchase_price']
        shareable = args['shareable']
        owner = args['owner']
        sql = """
                    INSERT INTO tools (name, description, tool_owner, purchase_price, purchase_date, shareable)
                    VALUES (%s, %s, %s, %s, %s, %s);
                """
        exec_commit(sql, (tool_name, description, owner, purchase_price, purchase_date, shareable))


class GetLastTool(Resource):
    def get(self, username):
        sql = """
            SELECT MAX(BARCODE) 
            FROM tools 
            WHERE tool_owner = %s
        """
        return exec_get_one(sql, [username])


class GetUserRequests(Resource):
    def get(self, username):
        sql = """
                    SELECT username, requested_tool, duration, date_required
                    FROM request
                    WHERE tool_owner = %s and status = 'Pending'
                    """
        return list(exec_get_all(sql, [username]))


class AcceptTool(Resource):
    def post(self, requested_tool, username):
        sql = """
                            UPDATE request 
                            SET status = 'Accepted'
                            WHERE requested_tool = %s AND username = %s;
                            
                            UPDATE request
                            SET status = 'Denied'
                            WHERE requested_tool = %s AND username <> %s
                        """
        exec_commit(sql, (requested_tool, username, requested_tool, username))


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
                    DELETE FROM categories
                    WHERE barcode = %s;        
        
                    DELETE FROM request
                    WHERE requested_tool = %s;                            
                                    
                    DELETE FROM tools 
                    WHERE barcode = %s;               
                                """
        exec_commit(sql, [tool, tool, tool])

class AvailableTools(Resource):
    def get(self, username):
        sql = """
            SELECT barcode, name, description, tool_owner 
            FROM tools
            WHERE tool_owner <> %s
            AND SHAREABLE = true
            AND barcode NOT IN
                (
                SELECT requested_tool
                FROM request
                WHERE status = 'Accepted'
                )
            AND barcode NOT IN
                (
                SELECT requested_tool
                FROM request
                WHERE status = 'Pending'
                AND username = %s
                )
            ORDER BY name
            """
        return list(exec_get_all(sql, [username, username]))

class RequestTool(Resource):
    def post(self, requested_tool, username, tool_owner):
        parser = reqparse.RequestParser()
        parser.add_argument('date_required', type=str)
        parser.add_argument('duration', type=str)
        args = parser.parse_args()

        date_required = args['date_required']
        duration = args['duration']
        sql = """
                            INSERT INTO request (username, requested_tool, tool_owner, date_required, duration, status)
                            VALUES (%s, %s, %s, %s, %s, 'Pending')
                        """
        exec_commit(sql, (username, requested_tool, tool_owner, date_required, duration))

class GetUserOutgoing(Resource):
    def get(self, username):
        sql = """
                    SELECT tool_owner, requested_tool, duration, date_required
                    FROM request
                    WHERE username = %s and status = 'Pending'
                    """
        return list(exec_get_all(sql, [username]))


class CancelRequest(Resource):
    def post(self, username, requested_tool):
        sql = """ 

                    DELETE FROM request
                    WHERE username = %s AND requested_tool = %s;
        """
        exec_commit(sql, [username, requested_tool])


class GetToolCount(Resource):
    def get(self, username):
        sql = """
                  SELECT COUNT(*)
                  FROM tools
                  WHERE tool_owner = %s AND shareable = true 
        """
        return exec_get_one(sql, [username])