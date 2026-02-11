from flask import Flask, render_template, request, redirect, url_for, session
import os

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "default")

@app.route("/")
def home():
    if not session.get("passed_quiz"):
        return redirect(url_for("quiz"))
    return render_template("index.html")

@app.route("/yes")
def yes():
    return render_template("yes.html")

@app.route("/quiz", methods=["GET", "POST"])
def quiz():
    if request.method == "POST":
        score = 0

        answers = {
            "q1": "c",
            "q2": "c",
            "q3": "d",
            "q4": "a",
            "q5": "b",
            "q6": "a",
            "q7": "d",
            "q8": "d",
            "q9": "a",
            "q10": "d"
        }

        for question, correct_answer in answers.items():
            if request.form.get(question) == correct_answer:
                score += 1

        if score >= 8:
            session["passed_quiz"] = True
            return render_template("quiz_pass.html", score=score)
        else:
            return render_template("quiz_fail.html", score=score)

    return render_template("quiz.html")



if __name__ == "__main__":
    app.run(debug=True)
