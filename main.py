from flask import Flask, render_template, session, redirect, url_for, escape, request
import get_api_data
from database_handler import database_handler


app = Flask(__name__)


@app.route("/")
@app.route("/<username>/<int:page>")
def index(page=1):
    username = request.args.get('username')
    print(username)
    print(session)
    if username not in session:
        username = None
    
    try:
        planets_data = get_api_data.planets_from_api(page)
    except KeyError:
        panets_data = None
    planets_data_length = len(planets_data)
    return render_template("page.html", planets_data=planets_data, page=page, planets_data_length=planets_data_length, username=username)


@app.route('/checkuser')
def checkuser():
   pass


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        username = request.form['username']
        return redirect(url_for('index', username=username, page=1))


@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    username = None
    return redirect(url_for('index', username=username))

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


if __name__ == '__main__':
    app.run(debug=True)

