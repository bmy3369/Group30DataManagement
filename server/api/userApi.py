from flask_restful import Resource
from flask_restful import request
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

        newUser = name

        sql = """
            SELECT * FROM USER
        """

        return list(exec_get_all(sql))


class LoginUser(Resource):
    def get(self, username, password):
        sql = """
            SELECT username FROM USERS
            WHERE username = %s and password = %s
         """
        user = exec_get_one(sql, (username, password))
        if user is not None:
            return username
        return False


class GetUsers(Resource):
    def get(self):
        sql = """
            SELECT * FROM USER 
            """
        return list(exec_get_all(sql))
