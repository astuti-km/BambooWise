
import os
import requests
from pathlib import Path
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

# Load environment variables from .env
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

app = Flask(__name__, static_folder=None)


# ---------------- WEBSITE ROUTES ----------------

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/style.css")
def css():
    return send_from_directory(BASE_DIR, "style.css")


@app.route("/script.js")
def javascript():
    return send_from_directory(BASE_DIR, "script.js")


# ---------------- GEMINI AI CHATBOT ----------------

@app.route("/api/chat", methods=["POST"])
def gemini_chat():

    data = request.get_json(silent=True) or {}
    message = str(data.get("message", "")).strip()

    if not message:
        return jsonify({
            "error": "Please enter a message."
        }), 400

    if len(message) > 2000:
        return jsonify({
            "error": "Message is too long. Please use fewer than 2000 characters."
        }), 400

    # Get Gemini API key
    api_key = os.getenv("GEMINI_API_KEY", "").strip()

    if not api_key:
        return jsonify({
            "error": "Gemini API key is missing. Please check your .env file."
        }), 503

    # Get Gemini model name
    model = os.getenv(
        "GEMINI_MODEL",
        "gemini-2.5-flash"
    ).strip()

    # Gemini API URL
    url = (
        "https://generativelanguage.googleapis.com/v1beta/"
        f"models/{model}:generateContent"
    )

    # API authentication headers
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": api_key
    }

    # BambooWise AI prompt
    prompt = f"""
You are BambooWise AI Shopping Assistant.

BambooWise is a sustainable hydration store
selling reusable bamboo water bottles.

PRODUCT CATALOGUE:
250 ml - ₹99
500 ml - ₹150
750 ml - ₹225
1 litre - ₹300
2 litres - ₹450

YOUR RESPONSIBILITIES:
1. Help customers select suitable bottles.
2. Explain bottle capacities and prices.
3. Recommend products based on customer needs.
4. Answer questions about sustainable hydration.
5. Suggest suitable products for travel, college,
   office, gym and everyday use.

RULES:
- Be friendly and professional.
- Keep answers simple and helpful.
- Do not invent product specifications.
- Do not claim certifications unless verified.
- Mention that this is a demo store when relevant.

Customer question: {message}
"""

    # Send request to Gemini
    try:
        response = requests.post(
            url,
            headers=headers,
            json={
                "contents": [
                    {
                        "parts": [
                            {"text": prompt}
                        ]
                    }
                ],
                "generationConfig": {
                    "temperature": 0.7,
                    "maxOutputTokens": 500
                }
            },
            timeout=30
        )

        response.raise_for_status()

        result = response.json()

        # Check Gemini response
        candidates = result.get("candidates", [])

        if not candidates:
            print("Gemini returned no candidates:", result)

            return jsonify({
                "error": "Gemini could not generate a reply. Please try another question."
            }), 502

        content = candidates[0].get("content", {})
        parts = content.get("parts", [])

        reply = " ".join(
            part.get("text", "")
            for part in parts
            if part.get("text")
        ).strip()

        if not reply:
            return jsonify({
                "error": "Gemini returned an empty response. Please try again."
            }), 502

        return jsonify({
            "reply": reply
        }), 200

    except requests.exceptions.Timeout:
        print("Gemini request timed out.")

        return jsonify({
            "error": "Gemini is taking too long. Please try again."
        }), 504

    except requests.exceptions.HTTPError as error:
        print("Gemini API status:", response.status_code)
        print("Gemini API error:", response.text[:1000])

        return jsonify({
            "error": f"Gemini API request failed (HTTP {response.status_code}). Check the VS Code terminal."
        }), 502

    except requests.exceptions.RequestException as error:
        print("Connection error:", str(error))

        return jsonify({
            "error": "Unable to connect to Gemini. Check your internet connection."
        }), 502

    except (ValueError, KeyError, IndexError, TypeError) as error:
        print("Response processing error:", str(error))

        return jsonify({
            "error": "Could not process the Gemini response. Please try again."
        }), 502


# ---------------- RUN FLASK SERVER ----------------

if __name__ == "__main__":

    print("🌿 BambooWise is running!")
    print("Open http://127.0.0.1:5000")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
