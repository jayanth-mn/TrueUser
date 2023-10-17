from flask import Flask, request, Response
from PIL import Image
from io import BytesIO
from flask_cors import CORS
import cv2
import numpy as np
import base64
import mediapipe as mp 
mp_face_mesh = mp.solutions.face_mesh

face_mesh = mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

def get_gaze_direction(frame):
  LEFT_EYE =[ 362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385,384, 398 ]
  RIGHT_EYE=[ 33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161 , 246 ] 
  LEFT_IRIS = [474,475, 476, 477]
  RIGHT_IRIS = [469, 470, 471, 472]
  GAZE_THRESHOLD = 5

  gaze_direction = ""
  rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
  img_h, img_w = frame.shape[:2]
  results = face_mesh.process(rgb_frame)
  if results.multi_face_landmarks:
      mesh_points = np.array([np.multiply([p.x, p.y], [img_w, img_h]).astype(int) for p in results.multi_face_landmarks[0].landmark])
      
      # Calculate eye centers
      left_eye_center = np.mean(mesh_points[LEFT_EYE], axis=0, dtype=np.int32)
      # Calculate iris centers
      left_iris_center = np.mean(mesh_points[LEFT_IRIS], axis=0, dtype=np.int32)

      # Determine gaze direction
      if left_iris_center[0] < left_eye_center[0] - GAZE_THRESHOLD:
          gaze_direction = "Left"
      elif left_iris_center[0] > left_eye_center[0] + GAZE_THRESHOLD:
          gaze_direction = "Right"
      elif left_iris_center[1] < left_eye_center[1] - (GAZE_THRESHOLD-2):
          gaze_direction = "Up"

  print(gaze_direction)
  return gaze_direction

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
        cv_img = cv2.flip(cv_img, 1)
        gaze_direction = get_gaze_direction(cv_img)
        cv2.imwrite('img.png', cv_img)


        return { 'image': opencv_image_to_data_uri(cv_img), 'detected_name': 'chirag', 'gaze_direction': gaze_direction }
    except Exception as e:
        print('Error uploading frame:', e)
        return Response(status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
