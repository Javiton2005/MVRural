from flask import Flask, request, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)

@app.route("/pueblos", methods=["GET"])
def get_pueblos():
    n = request.args.get("n", default=5, type=int)  # Por defecto devuelve 5
    response = supabase.table("pueblos").select("*").limit(n).execute()
    return jsonify(response.data)

if __name__ == "__main__":
    app.run(debug=True)