// (function() {
//   'use strict';
//   var video = document.querySelector('video')
//     , canvas;

//   /**
//    *  generates a still frame image from the stream in the <video>
//    *  appends the image to the <body>
//    */
//   function takeSnapshot() {
//     var img = document.querySelector('img') || document.createElement('img');
//     var context;
//     var width = video.offsetWidth
//       , height = video.offsetHeight;

//     canvas = canvas || document.createElement('canvas');
//     canvas.width = width;
//     canvas.height = height;

//     context = canvas.getContext('2d');
//     context.drawImage(video, 0, 0, width, height);

//     img.src = canvas.toDataURL('image/png');
//     document.body.appendChild(img);
//   }



//   // use MediaDevices API
//   // docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
//   if (navigator.mediaDevices) {
    
//     // access the web cam
//     navigator.mediaDevices.getUserMedia({video: true})
//     // permission granted:
//       .then(function(stream) {
//         video.src = window.URL.createObjectURL(stream);
//         video.addEventListener('click', takeSnapshot);
//       })
//       // permission denied:
//       .catch(function(error) {
//         console.log('Permission denied: ', error);
//         document.body.textContent = 'Could not access the camera. Error: ' + error.name;
//       });
//   }
// })();










'use strict';

console.log('camera script');

/* globals MediaRecorder */

// This code is adapted from
// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos


var PHOTO_WIDTH = 960;



var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var sourceBuffer;
var intervalTimer;
var startTime;
var finishTime;


var gumVideo = document.querySelector('video#gum');
var canvas = document.querySelector('#canvas');


// var recordButton = document.querySelector('button#record');
// var playButton = document.querySelector('button#play');
// var downloadButton = document.querySelector('button#download');
// recordButton.onclick = toggleRecording;
// playButton.onclick = play;
// downloadButton.onclick = download;

// window.isSecureContext could be used for Chrome
// var isSecureOrigin = location.protocol === 'https:' || location.host === 'localhost';
// if (!isSecureOrigin) {
//   alert('getUserMedia() must be run from a secure origin: HTTPS or localhost.' + '\n\nChanging protocol to HTTPS');
//   location.protocol = 'HTTPS';
// }

// Use old-style gUM to avoid requirement to enable the
// Enable experimental Web Platform features flag in Chrome 49

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

navigator.getUserMedia(constraints, successCallback, errorCallback);


function successCallback(stream) {
  console.log('getUserMedia() got stream: ', stream);
  window.stream = stream;
  if (window.URL) {
    gumVideo.srcObject = stream;

  } else {
    gumVideo.srcObject = stream;

  }
}


function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// navigator.mediaDevices.getUserMedia(constraints)
// .then(function(stream) {
//   console.log('getUserMedia() got stream: ', stream);
//   window.stream = stream; // make available to browser console
//   if (window.URL) {
//     gumVideo.src = window.URL.createObjectURL(stream);
//   } else {
//     gumVideo.src = stream;
//   }
// }).catch(function(error) {
//   console.log('navigator.getUserMedia error: ', error);
// });


function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}


function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

