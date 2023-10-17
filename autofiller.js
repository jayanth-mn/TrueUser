// // sleep = (ms) => {
// //   return new Promise(resolve => setTimeout(resolve, ms));
// // }

// // function sendInputEvent(text, targetElement) {
// //   // works for react controlled fields
// //   targetElement.focus();
// //   document.execCommand('insertText', false, text);
// // }

// // async function login(username, password) {
// //   const input_elements = document.getElementsByTagName('input');
// //   let prev = input_elements[0];
// //   let flag = false;
// //   for (let i = 1; i < input_elements.length; i++) {
// //     if (input_elements[i].type === 'password') {
// //       sendInputEvent(password, input_elements[i]);
// //       sendInputEvent(username, prev);
// //       flag = true;
// //       break;
// //     }
// //     prev = input_elements[i];
// //   }
// //   if (flag && document.querySelector('[type="submit"]')) {
// //     document.querySelector('[type="submit"]').click();
// //   }
// //   console.log("reached")
// //   console.log(document.querySelector('[type="submit"]'))
// // }

// // function injectVideoElement() {
// //   var videoElement = document.createElement('video');
// //   videoElement.autoplay = true;

// //   // Function to send the video stream frames via HTTP POST request
// //   function sendFrame() {
// //     if (videoElement.srcObject) {
// //       var canvas = document.createElement('canvas');
// //       var context = canvas.getContext('2d');
// //       canvas.width = videoElement.videoWidth;
// //       canvas.height = videoElement.videoHeight;
// //       context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
// //       var imageData = canvas.toDataURL('image/jpeg', 0.8); // Convert canvas to base64 JPEG image

// //       // Send the image data as JSON in the request body using fetch
// //       fetch('http://127.0.0.1:5002/upload', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ image: imageData })
// //       })
// //         .then(function (response) {
// //           if (response.ok) {
// //             console.log('Frame uploaded successfully');
// //           } else {
// //             console.error('Error uploading frame:', response.status);
// //           }
// //         })
// //         .catch(function (error) {
// //           console.error('Error uploading frame:', error);
// //         });
// //     }
// //   }

// //   navigator.mediaDevices.getUserMedia({ video: true })
// //     .then(function (stream) {
// //       videoElement.srcObject = stream;

// //       // Start sending video frames
// //       setInterval(sendFrame, 100); // Send a frame every 100 milliseconds
// //     })
// //     .catch(function (error) {
// //       console.error('Error accessing webcam:', error);
// //     });

// //   var body = document.body || document.documentElement;
// //   var firstChild = body.firstChild;

// //   if (firstChild) {
// //     body.insertBefore(videoElement, firstChild);
// //   } else {
// //     body.appendChild(videoElement);
// //   }
// // }

// // injectVideoElement();

// // fetch('http://127.0.0.1:5002').then((response) => {
// //   response.text().then((text) => {
// //     console.log(text);
// //   });
// // });


// // // const url = 'http://127.0.0.1:5002/upload';

// // // // Create the JSON data
// // // const data = {
// // //   image: 'testing',
// // //   param1: 'value1',
// // //   param2: 'value2'
// // // };

// // // // Send the POST request
// // // fetch(url, {
// // //   method: 'POST',
// // //   headers: {
// // //     'Content-Type': 'application/json'
// // //   },
// // //   body: JSON.stringify(data)
// // // })
// // //   .then(response => {
// // //     if (response.ok) {
// // //       console.log('Request successful!');
// // //     } else {
// // //       console.log('Request failed with status code:', response.status);
// // //     }
// // //   })
// // //   .catch(error => {
// // //     console.error('Request failed with error:', error);
// // //   });




// // // async function main() {
// // //   await sleep(1000);
// // //   login('chirag.cs20@bmsce.ac.in', 'fordemo@123');
// // // }
// // // main()









// function injectVideoElement() {
//   var videoElement = document.createElement('video');
//   videoElement.autoplay = true;

//   // Function to send the video stream frames via HTTP POST request
//   function sendFrame() {
//     if (videoElement.srcObject) {
//       var canvas = document.createElement('canvas');
//       var context = canvas.getContext('2d');
//       canvas.width = videoElement.videoWidth;
//       canvas.height = videoElement.videoHeight;
//       context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//       var imageData = canvas.toDataURL('image/jpeg', 0.8); // Convert canvas to base64 JPEG image

//       // Create a FormData object and append the image data
//       var formData = new FormData();
//       formData.append('image', imageData);

//       // Send the form data via fetch
//       fetch('http://127.0.0.1:5002/upload', {
//         method: 'POST',
//         body: formData
//       })
//         .then(function (response) {
//           if (response.ok) {
//             console.log('Frame uploaded successfully');
//           } else {
//             console.error('Error uploading frame:', response.status);
//           }
//         })
//         .catch(function (error) {
//           console.error('Error uploading frame:', error);
//         });
//     }
//   }

//   navigator.mediaDevices.getUserMedia({ video: true })
//     .then(function (stream) {
//       videoElement.srcObject = stream;

//       // Start sending video frames
//       setInterval(sendFrame, 100); // Send a frame every 100 milliseconds
//     })
//     .catch(function (error) {
//       console.error('Error accessing webcam:', error);
//     });

//   var body = document.body || document.documentElement;
//   var firstChild = body.firstChild;

//   if (firstChild) {
//     body.insertBefore(videoElement, firstChild);
//   } else {
//     body.appendChild(videoElement);
//   }
// }

// injectVideoElement();

// fetch('http://127.0.0.1:5002').then((response) => {
//   response.text().then((text) => {
//     console.log(text);
//   });
// });


function saveImage(canvas) {
  var canvasData = canvas.toDataURL("image/png");
  var xmlHttpReq = false;

  if (window.XMLHttpRequest) {
    ajax = new XMLHttpRequest();
  }
  else if (window.ActiveXObject) {
    ajax = new ActiveXObject("Microsoft.XMLHTTP");
  }

  ajax.open("POST", "testSave.php", false);
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.onreadystatechange = function() {
    console.log(ajax.responseText);
  }
  ajax.send("image=" + canvasData);
}


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



      saveImage(canvas);

      // var imageData = canvas.toDataURL('image/jpeg', 0.8); // Convert canvas to base64 JPEG image

      // // Create a new XHR object
      // var xhr = new XMLHttpRequest();

      // // Set up the request
      // xhr.open('POST', 'http://127.0.0.1:5002/upload', true);

      // // Set the Content-Type header to indicate form data
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      // // Set up the onload and onerror handlers
      // xhr.onload = function() {
      //   if (xhr.status === 200) {
      //     console.log('Frame uploaded successfully');
      //   } else {
      //     console.error('Error uploading frame:', xhr.status);
      //   }
      // };
      // xhr.onerror = function() {
      //   console.error('Error uploading frame:', xhr.status);
      // };

      // // Convert the image data to a URL-encoded format
      // var encodedImageData = encodeURIComponent(imageData);

      // // Send the image data in the request body
      // xhr.send('image=' + encodedImageData);







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

fetch('http://127.0.0.1:5002').then((response) => {
  response.text().then((text) => {
    console.log(text);
  });
});