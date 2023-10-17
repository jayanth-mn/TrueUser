import cv2
import base64
from flask import Flask
from flask_sockets import Sockets
import numpy as np

app = Flask(__name__)
sockets = Sockets(app)

# Route for serving the HTML page
@app.route('/')
def index():
    return 'hello'

# WebSocket handler
@sockets.route('/ws')
def ws_handler(ws):
    while not ws.closed:
        image_data = ws.receive()
        if image_data:
            # Decode the base64 image data
            decoded_data = base64.b64decode(image_data)
            nparr = np.frombuffer(decoded_data, np.uint8)
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Display the image using OpenCV
            cv2.imshow('Received Image', image)
            cv2.waitKey(1)  # Refresh the OpenCV window

# Event triggered when a WebSocket connection is established
@sockets.route('/echo')
def echo_socket(ws):
    while not ws.closed:
        message = ws.receive()
        if message:
            ws.send(message)

if __name__ == '__main__':
    app.run()
