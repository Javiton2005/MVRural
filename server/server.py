from flask import Flask, request, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv
from flask_cors import CORS  # ✅ Importa CORS
import os

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)
CORS(app)  # ✅ Activa CORS globalmente

# Mapeo de preferencias a valores de la base de datos
PREFERENCE_MAPPING = {
    "playa": "a",
    "montaña": "b",
    "ciudad": "c",
    "ninguna": "d"
}

@app.route("/turismo/<string:id>", methods=["GET"])
def get_tourist_by_id(id):
    try:
        response = supabase.table("town").select("*").eq("id", id).execute()

        if not response.data:
            return jsonify({
                "success": False,
                "error": "No se encontró un turista con ese ID"
            }), 404

        return jsonify({
            "success": True,
            "tourist": response.data[0]
        })

    except Exception as e:
        print(f"Error al obtener turista por ID: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Error interno del servidor"
        }), 500

@app.route("/pueblos", methods=["GET"])
def get_pueblos():
    n = request.args.get("n", default=5, type=int)
    response = supabase.table("town").select("*").limit(n).execute()
    return jsonify(response.data)

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "error": "Email and password are required"
        }), 400

    try:
        result = supabase.table("users").select("*").eq("email", email).execute()

        if not result.data:
            return jsonify({
                "success": False,
                "error": "Invalid credentials"
            }), 401

        user = result.data[0]

        if user["password"] != password:
            return jsonify({
                "success": False,
                "error": "Invalid credentials"
            }), 401

        reverse_mapping = {v: k for k, v in PREFERENCE_MAPPING.items()}
        user_preference = reverse_mapping.get(user["preference"], "ninguna")

        user_data = {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"],
            "role": user["user_role"],
            "preference": user_preference
        }

        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": user_data
        })

    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Internal server error"
        }), 500

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    try:
        required_fields = ["username", "email", "password", "preference"]
        if not all(field in data for field in required_fields):
            return jsonify({
                "success": False,
                "error": "Faltan campos requeridos"
            }), 400

        existing_user = supabase.table("users").select("*").or_(f"email.eq.{data['email']},username.eq.{data['username']}").execute()
        
        if existing_user.data:
            return jsonify({
                "success": False,
                "error": "El email o username ya están registrados"
            }), 400

        new_user = {
            "username": data["username"],
            "email": data["email"],
            "password": data["password"],
            "user_role": "user",
            "preference": data["preference"]
        }

        result = supabase.table("users").insert(new_user).execute()
        
        if not result.data:
            return jsonify({
                "success": False,
                "error": "No se pudo crear el usuario"
            }), 500

        return jsonify({
            "success": True,
            "message": "Registro exitoso",
            "user": {
                "username": result.data[0]["username"],
                "email": result.data[0]["email"]
            }
        })

    except Exception as e:
        print(f"Error en registro: {str(e)}")
        return jsonify({
            "success": False,
            "error": f"Error en el servidor: {str(e)}"
        }), 500

@app.route("/preferences", methods=["GET"])
def get_preferences():
    try:
        return jsonify({
            "success": True,
            "preferences": [
                {"id": "a", "name": "playa", "label": "Playa 🏖️"},
                {"id": "b", "name": "montaña", "label": "Montaña ⛰️"},
                {"id": "c", "name": "ciudad", "label": "Ciudad 🏙️"},
                {"id": "d", "name": "ninguna", "label": "Ninguna preferencia"}
            ]
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
