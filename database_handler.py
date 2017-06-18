import psycopg2
import sys


def connect_to_database():
    try:
        conn = psycopg2.connect("dbname='' user=''")
    except psycopg2.Error as error:
        print("Couldn't connect to database")
        print(error)
        sys.exit(1)
    else:
        return conn

