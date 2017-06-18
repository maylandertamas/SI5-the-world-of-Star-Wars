from flask import Flask, render_template
import get_api_data

app = Flask(__name__)


@app.route("/")
@app.route("/<int:page>")
def index(page=1):
    planets_data = get_api_data.get_planets_from_api(page)
    return render_template("page.html", planets_data=planets_data, page=page)


if __name__ == '__main__':
    app.run(debug=True)

