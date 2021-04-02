import hashlib

import psycopg2
import yaml
import os

from datetime import date


def connect():
    config = {}
    yml_path = os.path.join(os.path.dirname(__file__), 'db.yml')
    with open(yml_path, 'r') as file:
        config = yaml.load(file, Loader=yaml.FullLoader)

    return psycopg2.connect(dbname=config['database'],
                            user=config['user'],
                            password=config['password'],
                            host=config['host'],
                            port=config['port'])


def exec_sql_file(path):
    full_path = os.path.join(os.path.dirname(__file__), f'{path}')
    conn = connect()
    cur = conn.cursor()
    with open(full_path, 'r') as file:
        cur.execute(file.read())
    conn.commit()
    conn.close()


def exec_get_one(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    one = cur.fetchone()
    conn.close()
    return one


def exec_get_all(sql, args={}):
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    # https://www.psycopg.org/docs/cursor.html#cursor.fetchall
    list_of_tuples = cur.fetchall()
    conn.close()
    return tuples_to_lists(list_of_tuples)


def exec_commit(sql, args={}):
    # print("exec_commit:\n" + sql+"\n")
    conn = connect()
    cur = conn.cursor()
    result = cur.execute(sql, args)
    conn.commit()
    conn.close()
    return result


def hash_password(password):
    code = hashlib.sha256(password.encode("utf8"))
    return code.hexdigest()


def tuples_to_lists(list_of_tuples):
    list_of_lists = []
    for one_tuple in list_of_tuples:
        tuple_as_list = turn_to_strings(list(one_tuple))
        list_of_lists.append(tuple_as_list)
    return list_of_lists


def turn_to_strings(data_list):
    new_list = []
    for element in data_list:
        if isinstance(element, date):
            new_list.append(element.strftime("%Y/%m/%d"))
        else:
            new_list.append(str(element))
    return new_list
