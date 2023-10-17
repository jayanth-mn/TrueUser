// document.getElementById('credential-form').addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevents the form from submitting and refreshing the page
  
//   // Get the values from the form inputs
//   var name = document.getElementById('name').value;
//   var username = document.getElementById('username').value;
//   var password = document.getElementById('password').value;
  
//   // Format the username and password for storage
//   var credentials = username + '|' + password;
  
//   // Store the values in chrome.storage.sync
//   var storageKey = 'TrueUser/' + name; // Update the storage key
//   var storageData = {
//     'TrueUser/is_credential_stored': true,
//     [storageKey]: credentials
//   };
  
//   chrome.storage.sync.set(storageData, function() {
//     // Display a success message
//     alert('Credentials stored successfully!');
//   });
// });



document.getElementById('credential-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the form from submitting and refreshing the page
  
  // Get the values from the form inputs
  var name = document.getElementById('name').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  // Format the username and password for storage
  var credentials = username + '|' + password;
  
  // Get the active tab's site origin
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    var siteOrigin = new URL(activeTab.url).origin;
    
    // Update the storage key and value
    var storageKey = 'TrueUser/' + siteOrigin;
    var storageData = {};
    storageData[storageKey + '/is_credential_stored'] = true;
    storageData[storageKey + '/credentials' + `/${name}`] = credentials;

    console.log(storageData);
    
    // Store the values in chrome.storage.sync
    chrome.storage.sync.set(storageData, function() {
      // Display a success message
      alert('Credentials stored successfully!');
    });
  });
});




