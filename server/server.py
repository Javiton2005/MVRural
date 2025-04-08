from flask import Flask

app = Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["mem1","mem2","mem3","mem4"]}

if __name__ == "__main__":
    app.run(debug=True)