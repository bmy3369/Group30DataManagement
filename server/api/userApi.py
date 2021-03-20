from flask_restful import Resource
from flask_restful import reqparse

from .db_utils import *

class CreateUser(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username')
        parser.add_argument('password')
        parser.add_argument('firstname')
        parser.add_argument('lastname')
        parser.add_argument('email')
        args = parser.parse_args()
        name = args['username']

        newUser = (name, password, firstname, last, email)

        sql = """
            SELECT User
            FROM 
        """

        return list(exec_get_all(sql, newUser))