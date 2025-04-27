from flask import Flask

app = Flask(__name__)

@app.route("/members")
def members():
    return {"members": ["mem1",{"saludos":["hello","goodby","adios"]},"mem3","mem4"]}

if __name__ == "__main__":
    app.run(debug=True)