function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sendInputEvent(text, targetElement) {

  // const event = new InputEvent('input', {
  //   bubbles: true,
  //   cancelable: true
  // });

  // targetElement.value = text;

  // targetElement.dispatchEvent(event);

  targetElement.focus();
  document.execCommand('insertText', false, text);
}

async function login(username, password) {
  const input_elements = document.getElementsByTagName('input');
  let prev = input_elements[0];
  let flag = false;
  for (let i = 1; i < input_elements.length; i++) {
    if (input_elements[i].type === 'password') {
      // input_elements[i].value = password;
      sendInputEvent(password, input_elements[i]);
      // prev.value = username;
      sendInputEvent(username, prev);
      flag = true;
      break;
    }
    prev = input_elements[i];
  }
  if (flag && document.querySelector('[type="submit"]')) {
    // await sleep(1000);
    document.querySelector('[type="submit"]').click();
  }
}

login('chirag.cs20@bmsce.ac.in', 'fordemo@123')






function injectVideoElement() {
  var videoElement = document.createElement('video');
  videoElement.autoplay = true;

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      videoElement.srcObject = stream;
    })
    .catch(function(error) {
      console.error('Error accessing webcam:', error);
    });

  var body = document.body || document.documentElement;
  var firstChild = body.firstChild;

  if (firstChild) {
    body.insertBefore(videoElement, firstChild);
  } else {
    body.appendChild(videoElement);
  }
}











function injectVideoElement() {
  var videoElement = document.createElement('video');
  videoElement.autoplay = true;

  var socket; // Declare the WebSocket variable

  // Function to send the video stream frames via WebSocket
  function sendFrame() {
    if (videoElement.srcObject) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      var imageData = canvas.toDataURL('image/jpeg', 0.8); // Convert canvas to base64 JPEG image
      socket.send(imageData); // Send the image data to the server
    }
  }

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      videoElement.srcObject = stream;

      // Create WebSocket connection after obtaining video stream
      socket = new WebSocket('wss://127.0.0.1:5000/ws');

      // Event triggered when WebSocket connection is established
      socket.onopen = function() {
        // Start sending video frames
        setInterval(sendFrame, 100); // Send a frame every 100 milliseconds
      };

      // Event triggered when WebSocket connection receives a message
      socket.onmessage = function(event) {
        console.log('Received message:', event.data);
      };

      // Event triggered when WebSocket connection is closed
      socket.onclose = function(event) {
        console.log('WebSocket connection closed:', event);
      };
    })
    .catch(function(error) {
      console.error('Error accessing webcam:', error);
    });

  var body = document.body || document.documentElement;
  var firstChild = body.firstChild;

  if (firstChild) {
    body.insertBefore(videoElement, firstChild);
  } else {
    body.appendChild(videoElement);
  }
}

injectVideoElement();















function injectVideoElement() {
  var videoElement = document.createElement('video');
  videoElement.autoplay = true;

  // Function to send the video stream frames via HTTP POST request
  function sendFrame() {
    if (videoElement.srcObject) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      var imageData = canvas.toDataURL('image/jpeg', 0.8); // Convert canvas to base64 JPEG image

      // Send the image data as JSON in the request body using fetch
      fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://127.0.0.1:5002' // Set the desired origin
        },
        body: JSON.stringify({ image: imageData })
      })
        .then(function (response) {
          if (response.ok) {
            console.log('Frame uploaded successfully');
          } else {
            console.error('Error uploading frame:', response.status);
          }
        })
        .catch(function (error) {
          console.error('Error uploading frame:', error);
        });
    }
  }

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      videoElement.srcObject = stream;

      // Start sending video frames
      setInterval(sendFrame, 100); // Send a frame every 100 milliseconds
    })
    .catch(function (error) {
      console.error('Error accessing webcam:', error);
    });

  var body = document.body || document.documentElement;
  var firstChild = body.firstChild;

  if (firstChild) {
    body.insertBefore(videoElement, firstChild);
  } else {
    body.appendChild(videoElement);
  }
}

injectVideoElement();
