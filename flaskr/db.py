import sqlite3


DATABASE = 'database.db'

def create_ranking_table():
    # コネクションオブジェクト
    con = sqlite3.connect(DATABASE)
    # テーブル作成文
    con.execute('CREATE TABLE IF NOT EXISTS ranking (name, score, time)')
    con.close()