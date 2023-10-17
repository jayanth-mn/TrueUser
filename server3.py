from flask import Flask, render_template
from flask_sockets import Sockets

app = Flask(__name__)
sockets = Sockets(app)

@sockets.route('/websocket')
def websocket(ws):
    while not ws.closed:
        message = ws.receive()
        if message is not None:
            # Process the received message
            # For example, you can echo the message back to the client
            ws.send(message)

@app.route('/')
def index():
    return 'hello'

if __name__ == '__main__':
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    server = pywsgi.WSGIServer(('', 5002), app, handler_class=WebSocketHandler)
    server.serve_forever()
