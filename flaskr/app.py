from flask import Flask, render_template, request, send_from_directory, redirect, url_for
import sqlite3
import db

app = Flask(__name__)
db.create_ranking_table()
DATABASE = 'database.db'

# 効果音を読み込ませる
@app.route("/musics/正解.mp3")
def correct_sound():
    return send_from_directory("musics", "正解.mp3")

# 効果音を読み込ませる
@app.route("/musics/不正解.mp3")
def incorrect_sound():
    return send_from_directory("musics", "不正解.mp3")

# index.html
@app.route('/')
def index():
    # コネクションオブジェクト
    con = sqlite3.connect(DATABASE)
    # rankingテーブルを取得(fetchall()で取得したオブジェクトをリストにする)
    db_ranking = con.execute('SELECT * FROM ranking').fetchall()
    con.close()

    ranking = []
    r_tmp = []
    for row in db_ranking:
        r_tmp.append([row[0], int(row[1]), float(row[2])])
    # rankingをソートする
    if len(r_tmp) > 0:
        r_tmp.sort(key=lambda x:(-x[1], x[2]))
        for data in r_tmp:
            ranking.append(data)
            if len(ranking) == 3:
                break
    return render_template('index.html', ranking=ranking)

# ランキングに登録する処理
@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    score = request.form['score']
    time = request.form['time']
    if not name:
        name = '名無し'
    if not score:
        score = 0
    if not time:
        time = 100
    # コネクションオブジェクト
    con = sqlite3.connect(DATABASE)
    # DBに登録する文
    con.execute('INSERT INTO ranking VALUES(?, ?, ?)',
                [name, score, time])
    con.commit()
    con.close()
    # index.htmlにリダイレクト
    return redirect(url_for('index'))