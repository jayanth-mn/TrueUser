from flask import Flask, request, Response
from PIL import Image
from io import BytesIO
from flask_cors import CORS
import cv2
import numpy as np
import base64

def opencv_image_to_data_uri(image):
    # Convert the OpenCV image to a numpy array
    image_np = np.array(image)

    # Convert the image array to a byte string
    _, buffer = cv2.imencode('.png', image_np)

    # Encode the byte string as base64
    base64_str = base64.b64encode(buffer).decode('utf-8')

    # Create the data URI
    data_uri = f"data:image/png;base64,{base64_str}"

    return data_uri

def data_uri_to_cv_image(data_uri):
    
    encoded_data = data_uri.split(",")[1]
    decoded_data = base64.b64decode(encoded_data)
    nparr = np.frombuffer(decoded_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    return image

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'hi'


@app.route('/upload', methods=['POST'])
def upload():
    try:
        # Retrieve the image file from the request
        image_file = request.json['image']
        cv_img = data_uri_to_cv_image(image_file)
        # cv2.imwrite('img.png', cv_img)

        return { 'image': opencv_image_to_data_uri(cv_img), 'name': 'chirag' }
    
    except Exception as e:
        print('Error uploading frame:', e)
        return Response(status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
