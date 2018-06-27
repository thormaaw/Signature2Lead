import os
from flask import Flask, render_template, request, session, redirect, url_for, make_response, Response, send_from_directory, abort, Response, send_file
from models import db, User
from forms import SignupForm, Loginform


def runserver():
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/learningflask'
db.init_app(app)

app.secret_key = "development-key"




@app.route("/")
@app.route("/home")
@app.route("/about")
@app.route("/bootstrap")
def basic_pages():
    return make_response(open('static/index.html').read())

#def home():
#    return render_template("index.html")

@app.route("/version")
def version():
    return make_response(open('static/versions-mapping.json').read())

#@app.route("/about")
#def about():
#    return render_template("../static/partials/about.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if 'email' in session:
        return redirect(url_for('app'))

    form = SignupForm()

    if request.method == "POST":
        if form.validate() == False:
            return render_template("../static/partials/signup.html", form=form)
        else:
            newuser = User(form.first_name.data, form.last_name.data, form.email.data, form.password.data)
            db.session.add(newuser)
            db.session.commit()

            session['email'] = newuser.email
            return redirect(url_for('app'))
    elif request.method == "GET":
        return render_template("../static/partials/signup.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    if 'email' in session:
        return redirect(url_for('app'))

    form = Loginform()

    if request.method == "POST":
        if form.validate() == False:
            return render_template("../static/partials/login.html", form=form)
        else:
            email = form.email.data
            password = form.password.data

            user = User.query.filter_by(email=email).first()
            if user is not None and user.check_password(password):
                session['email'] = form.email.data
                return redirect(url_for('app'))
            else:
                return redirect(url_for('login'))
    elif request.method == "GET":
        return render_template("../static/partials/login.html", form=form)


@app.route("/logout")
def logout():
    session.pop('email', None)
    return redirect(url_for('home'))

#@app.route("/main")
#def main():
#    return render_template("app.html")

#@app.route("/partials/london")
#def london(london):
#    return send_file("/partials/")
#
#@app.route("/home/<location>")
#def app_location(location):
#   return render_template("/static/partials/{}.html".format(location))



@app.route("/apppage")
def apppage():
    if 'email' not in session:
        return redirect(url_for('login'))

    return render_template("../static/partials/app.html")


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'img/favicon.ico')

#@app.errorhandler(404)
#def page_not_found(#):
#    return render_template('404.html'), 404




if __name__ == '__main__':
    app.run(debug=True)
