import os
import uuid
from flask import Flask, request, jsonify, session
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app) # Enable CORS for all routes, allowing your frontend to connect

# IMPORTANT: Replace with your actual Gemini API Key
# It's highly recommended to use environment variables for API keys in production
# Example: os.environ.get("GEMINI_API_KEY")
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY" # <<< REPLACE THIS with your Gemini API Key

if not GEMINI_API_KEY or GEMINI_API_KEY == "YOUR_GEMINI_API_KEY":
    raise ValueError("GEMINI_API_KEY is not set. Please replace 'YOUR_GEMINI_API_KEY' or set it as an environment variable.")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize the Gemini model
model = genai.GenerativeModel('gemini-pro')

# --- Store conversation history per user session ---
user_sessions = {}

# --- Initial system prompt for the AI's persona ---
# This acts as a "system message" that guides the AI's behavior.
# It now explicitly emphasizes both its general conversational ability AND its college role.
INITIAL_BOT_PERSONA_MESSAGE = {
    'role': 'model', # 'model' role represents the AI's internal thought process/system prompt
    'parts': [
        {
            'text': (
                "You are 'College Compass', an AI assistant for [Your College Name, e.g., National College of Technology] "
                "admissions located in [Your City, e.g., Madurai, Tamil Nadu, India].\n"
                "You are designed to be a highly versatile and friendly conversationalist. "
                "Your capabilities include: \n"
                "1. **Engaging in general conversation and chitchat:** Feel free to ask about my day, tell a joke, or discuss common topics. I can respond to greetings, farewells, and general inquiries politely and naturally.\n"
                "2. **Providing accurate and helpful information:** My primary specialized role is to answer questions about [Your College Name]'s "
                "admissions process, academic courses, campus facilities, student life, contact details, and college images.\n"
                "I will always try my best to answer any question you ask. If a question is outside my direct knowledge base (e.g., real-time weather, very obscure current events), "
                "I will politely state that I cannot access that information, but I will still maintain a helpful and friendly tone.\n"
                "My current knowledge about Madurai weather will be based on my training data, as I don't have real-time access to current weather conditions.\n"
                "Keep responses concise unless more detail is requested. When providing links, use markdown format `[Link Text](URL)`."
            )
        }
    ]
}


@app.before_request
def setup_session():
    """Manages chat sessions by getting/creating a session ID and initializing chat history."""
    global user_sessions
    
    # Get session_id from request header or create a new one
    request_session_id = request.headers.get('session_id')
    if not request_session_id:
        request_session_id = uuid.uuid4().hex
        # You might want to send this new ID back to the frontend to store
        # For simplicity, our frontend already generates one and sends it.

    request.session_id = request_session_id # Attach to request object for easy access

    if request.session_id not in user_sessions:
        # Start a new chat session with the initial persona message
        # The 'parts' of the message are directly used by Gemini's history.
        user_sessions[request.session_id] = model.start_chat(history=[
            INITIAL_BOT_PERSONA_MESSAGE
        ])
        print(f"New chat session started for: {request.session_id}")
    
@app.route('/chat', methods=['POST'])
def chat():
    """Handles chat messages by sending them to Gemini API and returning the response."""
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'reply': 'No message provided.'}), 400

    chat_session = user_sessions[request.session_id]

    try:
        # Send the user message to the Gemini model within the context of the chat session
        response = chat_session.send_message(user_message)
        
        # Gemini's response structure might vary; access the text part
        bot_reply = response.text

        return jsonify({'reply': bot_reply, 'session_id': request.session_id})

    except Exception as e:
        print(f"Error communicating with Gemini API: {e}")
        # In case of API error, provide a friendly fallback
        return jsonify({'reply': 'I am currently unable to process your request. Please try again later.'}), 500

if __name__ == '__main__':
    # Run the Flask app
    app.run(host='127.0.0.1', port=3000, debug=True)