from flask import Flask, render_template
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)

# Set the Content Security Policy header
@app.after_request
def add_security_headers(response):
    response.headers['Content-Security-Policy'] = "connect-src 'self' *"
    return response

# WebSocket route for receiving frames
@sockets.route('/ws')
def ws(socket):
    while not socket.closed:
        image_data = socket.receive()
        print(image_data)
        # Process the received image data

if __name__ == '__main__':
    # Start the Flask app with WebSocket support
    app.run()
