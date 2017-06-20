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
   pass


@app.route('/login', methods=['POST'])
def login():
    session['username'] = request.form['username']
    password = request.form['password']
    hashed_pass = generate_password_hash(password)
    return redirect(url_for('index'))


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


if __name__ == '__main__':
    app.run(debug=True)

