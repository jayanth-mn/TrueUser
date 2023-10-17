// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.action === "captureImage") {
//     navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
//       var video = document.createElement("video");
//       video.srcObject = stream;
//       video.play();

//       video.addEventListener("loadeddata", function () {
//         var canvas = document.createElement("canvas");
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;

//         var context = canvas.getContext("2d");
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);

//         var dataUrl = canvas.toDataURL("image/png");

//         chrome.runtime.sendMessage({ action: "captureImage", dataUrl: dataUrl });

//         stream.getTracks().forEach(function (track) {
//           track.stop();
//         });
//       });
//     }).catch(function (error) {
//       console.log("Error accessing webcam:", error);
//     });
//   }
// });


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
