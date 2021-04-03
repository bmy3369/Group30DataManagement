from datetime import date
from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse
from .db_utils import *


def read_users(filename):
    user_file = open(filename, "r")
    for line in user_file:
        username, password, first_name, last_name, email = line.split(",")
        sql = """
                    INSERT INTO users (username, password, first_name, last_name, email, creation_date)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
        creation_date = date.today()
        exec_commit(sql, (name, password, first, last, email, creation_date))


def read_tools(filename):
    tool_file = open(filename, "r")
    for line in tool_file:
        barcode, name, description, tool_owner, purchase_price, purchase_date, shareable = line.split(",")
        sql = """
                            INSERT INTO tools (name, description, tool_owner, purchase_price, purchase_date, shareable)
                            VALUES (%s, %s, %s, %s, %s, %s);
                        """
        exec_commit(sql, (tool_name, description, owner, purchase_price, purchase_date, shareable))


def main() -> None:
    read_users("/users.csv")
    # read_tools("/tools.csv")


if __name__ == '__main__':
    main()
