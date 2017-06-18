from flask import Flask, render_template
import get_api_data

app = Flask(__name__)


@app.route("/")
@app.route("/<int:page>")
def index(page=1):
    planets_data = []
    try:
        planets_data = get_api_data.planets_from_api(page)
    except KeyError:
        panets_data = None
    planets_data_length = len(planets_data)
    return render_template("page.html", planets_data=planets_data, page=page, planets_data_length=planets_data_length)

if __name__ == '__main__':
    app.run(debug=True)

