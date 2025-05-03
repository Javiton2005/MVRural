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
    n = request.args.get("n", default=5, type=int)
    response = supabase.table("pueblos").select("*").limit(n).execute()
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
        # 1. Buscar usuario por email (solo email primero)
        result = supabase.table("users").select("*").eq("email", email).execute()

        # 2. Verificar si el usuario existe
        if not result.data:
            return jsonify({
                "success": False,
                "error": "Invalid credentials"  # Mensaje genérico por seguridad
            }), 401

        user = result.data[0]

        # 3. Verificar contraseña (sin hash en este ejemplo)
        if user["password"] != password:
            return jsonify({
                "success": False,
                "error": "Invalid credentials"  # Mismo mensaje que arriba
            }), 401

        # 4. Preparar respuesta exitosa
        user_data = {
            "id": user["id"],
            "name": user.get("username") or user.get("full_name") or "Usuario",  # Campos alternativos
            "email": user["email"],
            # Añade otros campos que necesites en el frontend
            "avatar": user.get("avatar_url")  # Ejemplo de campo opcional
        }

        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": user_data  # Datos limpios sin password
        })

    except Exception as e:
        print(f"Login error: {str(e)}")  # Log para debugging
        return jsonify({
            "success": False,
            "error": "Internal server error"
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
