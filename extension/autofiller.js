function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sendInputEvent(text, targetElement) {

  targetElement.focus();
  document.execCommand('insertText', false, text);
}


async function login(username, password) {
  await sleep(2000);
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

async function main() {

await sleep(2000);

// console.log(document.querySelector('[type="password"]'));
if (document.querySelector('[type="password"]')) {

var siteOrigin = window.origin;

// Construct the storage key
var storageKey = 'TrueUser/' + siteOrigin;

// Check if the value is true
chrome.storage.sync.get(storageKey + '/is_credential_stored', function(result) {
  var isCredentialStored = result[storageKey + '/is_credential_stored'];
  if (isCredentialStored) {








  var detectedName;
  var lastDetectedName;
  var sendFrameInterval = null;

  var videoElementContainer;
  var blurElement;
  var container;
  // var verifyButton;
  var bottomContainer

  function verification_complete() {
    // Clear the interval
    clearInterval(sendFrameInterval);
    // Remove injected elements
    videoElementContainer.remove();
    blurElement.remove();
    container.remove();
    // verifyButton.remove();
    bottomContainer.remove();

    var storageKey = 'TrueUser/' + siteOrigin;

    // Retrieve the credentials from chrome.storage.sync
    chrome.storage.sync.get(storageKey + '/credentials' + `/${lastDetectedName}`, function(result) {
      var credentials = result[storageKey + '/credentials' + `/${lastDetectedName}`];
    
      if (credentials) {
        // Extract the username and password from the retrieved credentials
        var [username, password] = credentials.split('|');
    
        // Use the retrieved username and password as needed
        console.log('Username:', username);
        console.log('Password:', password);

        login(username, password);
      } else {
        console.log('No credentials found for the specified name.');
      }
    });
  }




  function injectVideoElement() {
    var videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.style.visibility = 'hidden';

    videoElementContainer = document.createElement('div');
    videoElementContainer.style.position = 'fixed';
    videoElementContainer.style.top = '0';
    videoElementContainer.style.right = '0';
    videoElementContainer.style.width = '160px';
    videoElementContainer.style.height = '120px';
    videoElementContainer.style.zIndex = '1000000';
    videoElementContainer.style.border = '5px solid black';
    videoElementContainer.style.borderRadius = '5px';
    videoElementContainer.style.backgroundColor = 'black';

    var videoFeedback = document.createElement('img');
    videoFeedback.style.width = '100%';
    videoFeedback.style.height = '100%';
    videoElementContainer.appendChild(videoFeedback);

    // Create an element for displaying the detected name
    var detectedElement = document.createElement('div');
    detectedElement.style.backgroundColor = 'black';
    detectedElement.style.border = '5px solid black';
    detectedElement.style.borderRadius = '5px';
    detectedElement.style.width = '100%';
    detectedElement.style.color = 'white';
    detectedElement.style.padding = '5px';
    detectedElement.style.fontSize = '16px';
    detectedElement.innerText = 'Detected: ';

    // Create a span element for displaying the detected name
    var detectedNameElement = document.createElement('span');
    detectedNameElement.id = 'detected-name';
    detectedNameElement.textContent = 'None';

    // Append the detected name element to the detected element
    detectedElement.appendChild(detectedNameElement);

    // Append the detected element to the video element container
    videoElementContainer.appendChild(detectedElement);

    // Function to send the video stream frames via HTTP POST request
    function sendFrame() {
      if (videoElement.srcObject) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
        var imageData = canvas.toDataURL('image/jpeg', 0.8);
    
        var jsonData = {
          image: imageData
        };
    
        fetch('http://127.0.0.1:5002/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
        })
          .then(function (response) {
            if (response.ok) {
              // console.log('Frame uploaded successfully');
              response.json().then(function (data) {
                image = data['image'];
                detectedName = data['detected_name'];
                gaze_direction = data['gaze_direction'];
                handleGazeDirection(gaze_direction);


                if (detectedName.toLowerCase() != 'none') {
                  lastDetectedName = detectedName.toLowerCase();
                }

                // console.log(image.substring(0, 100) + '...');

                // set videoFeedback image
                videoFeedback.src = image;

                // Set the detected name element's text content
                detectedNameElement.textContent = detectedName;

              });
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
        sendFrameInterval = setInterval(sendFrame, 100); // Send a frame every 100 milliseconds
      })
      .catch(function (error) {
        console.error('Error accessing webcam:', error);
      });

    var body = document.body || document.documentElement;
    var firstChild = body.firstChild;

    if (firstChild) {
      body.insertBefore(videoElementContainer, firstChild);
    } else {
      body.appendChild(videoElementContainer);
    }

    blurElement = document.createElement('div');
    blurElement.id = 'TrueUser-blur';
    blurElement.style.position = 'fixed';
    blurElement.style.top = '0';
    blurElement.style.left = '0';
    blurElement.style.width = '100%';
    blurElement.style.height = '100%';
    blurElement.style.zIndex = '100000';
    blurElement.style.background = 'transparent';
    blurElement.style.backdropFilter = 'blur(10px)';
    blurElement.style.pointerEvents = 'none';
    
    document.body.appendChild(blurElement);

      // Create a container div
  container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '5px';
  container.style.left = '50%';
  container.style.transform = 'translateX(-50%)';
  container.style.textAlign = 'center';
  container.style.zIndex = '100001';

  // Create a title element
  var titleElement = document.createElement('h1');
  titleElement.innerText = 'Password Autofill available for this website';
  titleElement.style.fontSize = '30px';
  titleElement.style.fontWeight = 'bold';
  titleElement.style.color = 'white';

  // Create an exit button
  var exitButton = document.createElement('button');
  exitButton.innerText = 'Exit';
  exitButton.style.marginTop = '10px';

  // Add event listener to remove injected elements and clear the interval on button click
  exitButton.addEventListener('click', function() {
    // Clear the interval
    clearInterval(sendFrameInterval);
    // Remove injected elements
    videoElementContainer.remove();
    blurElement.remove();
    container.remove();
    bottomContainer.remove();
  });

  // Append the elements to the container
  container.appendChild(titleElement);
  container.appendChild(exitButton);


  bottomContainer = document.createElement('div');
  bottomContainer.style.position = 'fixed';
  bottomContainer.style.bottom = '10px';
  bottomContainer.style.left = '50%';
  bottomContainer.style.transform = 'translateX(-50%)';
  bottomContainer.style.textAlign = 'center';
  bottomContainer.style.zIndex = '100001';

  // Create a text element for the bottom text
  var bottomTextElement = document.createElement('h1');
  bottomTextElement.innerText = 'Guide the arrow to the target to verify your identity (using eye movement)';
  bottomTextElement.style.fontSize = '30px';
  bottomTextElement.style.fontWeight = 'bold';
  bottomTextElement.style.color = 'white';

  // Append the text element to the bottom container
  bottomContainer.appendChild(bottomTextElement);

  // Append the bottom container to the document body
  document.body.appendChild(bottomContainer);

  // Append the container to the document body
  document.body.appendChild(container);

  // Create a random distance and horizontal position for the target
  var minDistance = 20;
  var maxDistance = 400;
  var minHorizontal = 10;
  var maxHorizontal = 400;

  var randomDistance = Math.floor(Math.random() * (maxDistance - minDistance + 1)) + minDistance;
  var randomHorizontalPosition = Math.floor(Math.random() * (maxHorizontal - minHorizontal + 1)) + minHorizontal;


  // Create an arrow element
  var arrowElement = document.createElement('img');
  arrowElement.src = 'https://www.freepnglogos.com/uploads/target-png/target-png-transparent-image-pngpix-6.png';
  arrowElement.style.position = 'fixed';
  arrowElement.style.bottom = '10px';
  arrowElement.style.left = '50%';
  arrowElement.style.transform = 'translateX(-50%)';
  arrowElement.style.width = '50px';
  arrowElement.style.height = '50px';
  arrowElement.style.zIndex = '100001';
  arrowElement.style.transition = 'transform 0.2s ease-in-out';

  // Create a target element
  var targetElement = document.createElement('img');
  targetElement.src = 'https://www.freepnglogos.com/uploads/target-png/target-png-transparent-image-pngpix-6.png';
  targetElement.style.position = 'fixed';
  targetElement.style.bottom = randomDistance + 'px';
  targetElement.style.left = randomHorizontalPosition + 'px';
  targetElement.style.width = '50px';
  targetElement.style.height = '50px';
  targetElement.style.zIndex = '100001';

  // Append the arrow and target elements to the document body
  document.body.appendChild(arrowElement);
  document.body.appendChild(targetElement);

  // Function to move the arrow based on gaze direction
  function moveArrow(gazeDirection) {
    if (gazeDirection === 'left') {
      arrowElement.style.left = parseInt(arrowElement.style.left) - 10 + 'px';
    } else if (gazeDirection === 'right') {
      arrowElement.style.left = parseInt(arrowElement.style.left) + 10 + 'px';
    } else if (gazeDirection === 'up') {
      arrowElement.style.bottom = parseInt(arrowElement.style.bottom) + 10 + 'px';
    }
  }

  // Function to check for collision between arrow and target
  function checkCollision() {
    var arrowTop = arrowElement.offsetTop;
    var arrowLeft = arrowElement.offsetLeft;
    var arrowWidth = arrowElement.offsetWidth;
    var arrowHeight = arrowElement.offsetHeight;

    var targetTop = targetElement.offsetTop;
    var targetLeft = targetElement.offsetLeft;
    var targetWidth = targetElement.offsetWidth;
    var targetHeight = targetElement.offsetHeight;

    if (
      arrowLeft < targetLeft + targetWidth &&
      arrowLeft + arrowWidth > targetLeft &&
      arrowTop < targetTop + targetHeight &&
      arrowTop + arrowHeight > targetTop
    ) {
      verification_complete();
    }
  }

  // Call moveArrow and checkCollision when gaze_direction is available
  function handleGazeDirection(gazeDirection) {
    if (gazeDirection) {
      console.log(gazeDirection);
      moveArrow(gazeDirection);
      checkCollision();
    }
  }

  
  
  
  
  
  ///////////////////////// temporary
  
  // verifyButton = document.createElement('button');
  // verifyButton.innerText = 'Verify';
  // verifyButton.style.position = 'fixed';
  // verifyButton.style.top = '50%';
  // verifyButton.style.left = '50%';
  // verifyButton.style.transform = 'translate(-50%, -50%)';
  // verifyButton.style.fontSize = '24px';
  // verifyButton.style.fontWeight = 'bold';
  // verifyButton.style.padding = '10px 20px';
  // verifyButton.style.backgroundColor = 'white';
  // verifyButton.style.color = 'black';
  // verifyButton.style.border = 'none';
  // verifyButton.style.borderRadius = '5px';
  // verifyButton.style.cursor = 'pointer';
  // verifyButton.style.zIndex = '10000002';
  
  // // Add event listener to the verify button
  // verifyButton.addEventListener('click', verification_complete);
  
  // // Append the verify button to the document body
  // document.body.appendChild(verifyButton);
  
  ///////////////////////// temporary
  
  
  
  


    
  }
  
  injectVideoElement();
  
  
  
  
  
  
  
  
  
  
  
  
  







  }
});


}
}
main();