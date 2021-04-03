from datetime import date
from flask_restful import Resource
from flask_restful import request
from flask_restful import reqparse
from db_utils import *


def getLastBarcode(username):
    sql = """
        SELECT MAX(BARCODE) 
        FROM tools 
        WHERE tool_owner = %s
    """
    return exec_get_one(sql, [username])

def giveCategories(barcode, categories):
    amt = random.randint(0,4)
    for i in range(amt):
        randCat = random.randint(0, categories.length-1)
        cat = categories[randCat]
        addCategory(barcode, cat)


def addCategory(barcode, category):
    sql = """
         INSERT INTO categories (barcode, category_type)
         VALUES(%s, %s)
         """
    exec_commit(sql, [barcode, category])

def giveTool(username, tool, categories):
    sql = """    
           INSERT INTO tools (name, description, purchase_price, purchase_date, shareable, tool_owner)
           VALUES (%s, %s, %s, %s, %s, %s);
           """
    tool.append(username)
    exec_commit(sql, tool)
    barcode = getLastBarcode(username)
    giveCatergories(barcode, categories)


def giveTools(username, tools, categories):
        amt = random.randint(5, 25)
        for i in range(amt):
            randTool = random.randint(0, tools.length -1)
            tool = tools[randTool]
            giveTool(username, tool, categories)


def read_users(filename):
    user_file = open(filename, "r")
    tools = getTools('tools.csv')
    cats = getCategories('categories.csv')
    for line in user_file:
        username, password, first_name, last_name, email = line.split(",")
        sql = """
                    INSERT INTO users (username, password, first_name, last_name, email, creation_date)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
        creation_date = datetime.today()
        exec_commit(sql, (username, hash_password(password), first_name, last_name, email, creation_date))
        giveTools(username, tools, cats)

def getCategories(filename):
    tool_file = open(filename, "r")
    cats = []
    for line in tool_file:
        cats.append(line)
    return cats

def getTools(filename):
    tool_file = open(filename, "r")
    tools = []
    for line in tool_file:
        barcode, name, description, purchase_price, purchase_date, shareable = line.split(",")

        newTool = [name, description, purchase_price, purchase_date, shareable]
        tools.append(newTool)
    return tools


def main() -> None:
    read_users("users.csv")
    # read_tools("/tools.csv")


if __name__ == '__main__':
    main()
