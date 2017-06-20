from flask import Flask, render_template, session, redirect, url_for, escape, request
import get_api_data
from database_handler import database_handler
from werkzeug.security import generate_password_hash, check_password_hash
app = Flask(__name__)


@app.route("/")
@app.route("/<int:page>")
def index(username=None, page=1):
    if 'username' in session:
        username = session['username']
    else:
        username = None
    try:
        planets_data = get_api_data.planets_from_api(page)
    except KeyError:
        panets_data = None
    planets_data_length = len(planets_data)
    return render_template("page.html", planets_data=planets_data, page=page, planets_data_length=planets_data_length, username=username)


@app.route('/registration', methods=['POST'])
def registration():
    username = request.form['username']
    password = request.form['password']
    hashed_password = generate_password_hash(password,"pbkdf2:sha224", 1)

    write_to_database = database_handler("INSERT INTO user_table (username, password)\
                    VALUES ($${0}$$, $${1}$$);".format(username, hashed_password), "write")
    if write_to_database == "error":
        return '<a href="/"><button href= class="btn btn-default">Back</button></a><p>Username already exists or too long<p>'
    return redirect(url_for('index'))


@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user_db_data = database_handler("SELECT username, password FROM user_table\
                        WHERE username='{0}';".format(username))
    try:
        username_from_db = user_db_data[0][0]
    except IndexError:
        return '<a href="/"><button href= class="btn btn-default">Back</button></a><p>Username not found<p>' 
    else:
        user_pw_from_db = user_db_data[0][1]
        remove_white_spaces_from_pw = user_pw_from_db.strip()
        password_check = check_password_hash(remove_white_spaces_from_pw, password)
        if password_check:
            session['username'] = username_from_db
        else:
            return '<a href="/"><button href= class="btn btn-default">Back</button></a><p>Invalid password<p>'

    return redirect(url_for('index'))


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


if __name__ == '__main__':
    app.run(debug=True)

