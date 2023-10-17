from flask import Flask, request, Response
from PIL import Image
from io import BytesIO
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'hi'

@app.route('/upload', methods=['POST'])
def upload():
    try:
        # Retrieve the image data from the request
        data = request.get_json()
        image_data = data['image']
        
        # Decode base64 image data to bytes
        image_bytes = base64.b64decode(image_data)

        # Create a PIL Image object from the image bytes
        image = Image.open(BytesIO(image_bytes))

        # Display the image
        image.show()

        return Response(status=200)
    except Exception as e:
        print('Error uploading frame:', e)
        return Response(status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
