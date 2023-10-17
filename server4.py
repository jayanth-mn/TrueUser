import asyncio
import websockets
import ssl
import base64
from PIL import Image
from io import BytesIO

async def handle_frame(websocket, path):
    while True:
        try:
            # Receive the base64 encoded image data from the client
            image_data = await websocket.recv()

            # Convert the base64 encoded image data to bytes
            image_bytes = base64.b64decode(image_data.split(',')[1])

            # Create a PIL Image object from the image bytes
            image = Image.open(BytesIO(image_bytes))

            # Display the image
            image.show()
        except websockets.exceptions.ConnectionClosed:
            break

ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

start_server = websockets.serve(handle_frame, '0.0.0.0', 5001, ssl=ssl_context)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
