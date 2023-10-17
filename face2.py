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
                    if 133 <= idx <= 143:  # Indices for the left eye
                        left_eye_landmarks.append(landmark)
                    elif 362 <= idx <= 372:  # Indices for the right eye
                        right_eye_landmarks.append(landmark)

                # Get the center of the iris
                left_iris_center = get_iris_center(left_eye_landmarks, frame.shape)
                right_iris_center = get_iris_center(right_eye_landmarks, frame.shape)

                # Draw circles to visualize the iris centers
                cv2.circle(frame, left_iris_center, 3, (0, 0, 255), -1)
                cv2.circle(frame, right_iris_center, 3, (0, 0, 255), -1)

            cv2.imshow('Iris Centers', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()

def get_iris_center(landmarks, frame_shape):
    min_x = frame_shape[1]
    max_x = 0
    min_y = frame_shape[0]
    max_y = 0

    for landmark in landmarks:
        x = int(landmark.x * frame_shape[1])
        y = int(landmark.y * frame_shape[0])

        if x < min_x:
            min_x = x
        if x > max_x:
            max_x = x
        if y < min_y:
            min_y = y
        if y > max_y:
            max_y = y

    center_x = int((min_x + max_x) / 2)
    center_y = int((min_y + max_y) / 2)

    return center_x, center_y

if __name__ == "__main__":
    main()
