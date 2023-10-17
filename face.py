import cv2
import mediapipe as mp

def main():
    mp_drawing = mp.solutions.drawing_utils
    mp_face_mesh = mp.solutions.face_mesh

    cap = cv2.VideoCapture(0)  # Open the webcam

    with mp_face_mesh.FaceMesh(
        static_image_mode=False,
        max_num_faces=1,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5,
    ) as face_mesh:

        while True:
            ret, frame = cap.read()  # Read frame from webcam

            if not ret:
                break

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Detect landmarks in the frame
            results = face_mesh.process(frame_rgb)

            if results.multi_face_landmarks:
                face_landmarks = results.multi_face_landmarks[0]

                left_eye_landmarks = []
                right_eye_landmarks = []

                # Extract landmarks for left and right eyes
                for idx, landmark in enumerate(face_landmarks.landmark):
                    if idx in [33, 133, 246, 161]:
                        left_eye_landmarks.append(landmark)
                    elif idx in [362, 263, 249, 390]:
                        right_eye_landmarks.append(landmark)

                # Get the center of the whole eye
                left_eye_center = get_landmark_center(left_eye_landmarks, frame.shape)
                right_eye_center = get_landmark_center(right_eye_landmarks, frame.shape)

                # Get the center of the iris
                left_iris_center = get_iris_center(results, 33, 133, frame.shape)
                right_iris_center = get_iris_center(results, 362, 263, frame.shape)

                # Draw circles to visualize the centers
                cv2.circle(frame, left_eye_center, 5, (0, 255, 0), -1)
                cv2.circle(frame, right_eye_center, 5, (0, 255, 0), -1)
                cv2.circle(frame, left_iris_center, 3, (0, 0, 255), -1)
                cv2.circle(frame, right_iris_center, 3, (0, 0, 255), -1)

            cv2.imshow('Eye Centers', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()

def get_landmark_center(landmarks, frame_shape):
    x_sum = sum([landmark.x for landmark in landmarks])
    y_sum = sum([landmark.y for landmark in landmarks])
    center_x = int(x_sum / len(landmarks) * frame_shape[1])
    center_y = int(y_sum / len(landmarks) * frame_shape[0])
    return center_x, center_y

def get_iris_center(results, landmark_idx1, landmark_idx2, frame_shape):
    landmarks = results.multi_face_landmarks[0].landmark
    iris_x = (landmarks[landmark_idx1].x + landmarks[landmark_idx2].x) / 2
    iris_y = (landmarks[landmark_idx1].y + landmarks[landmark_idx2].y) / 2
    iris_center_x = int(iris_x * frame_shape[1])
    iris_center_y = int(iris_y * frame_shape[0])
    return iris_center_x, iris_center_y

if __name__ == "__main__":
    main()
