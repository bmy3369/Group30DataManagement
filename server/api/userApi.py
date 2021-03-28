from datetime import datetime, timedelta

from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse

from .db_utils import *


class CreateUser(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('first', type=str)
        parser.add_argument('last', type=str)
        parser.add_argument('email', type=str)
        args = parser.parse_args()

        name = args['username']
        password = hash_password(args['password'])
        email = args['email']
        first = args['first']
        last = args['last']
        date = datetime.today()
        sql = """
            INSERT INTO users (username, password, first_name, last_name, email, creation_date)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        exec_commit(sql, (name, password, first, last, email, date))


class LoginUser(Resource):
    def get(self, username, password):
        sql = """
            SELECT username FROM USERS
            WHERE username = %s and password = %s
         """
        newPass = hash_password(password)
        user = exec_get_one(sql, (username, newPass))
        if user is not None:
            sql = """
                UPDATE users
                SET last_access_date = %s
                WHERE username = %s
            """
            date = datetime.today()
            exec_commit(sql, (date, username))

            return username
        return False


class GetUsers(Resource):
    def get(self):
        sql = """
            SELECT * FROM USER 
            """
        return list(exec_get_all(sql))
