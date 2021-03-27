const express = require("express");
// const AuthorController = require("../controllers/food.js");

const router = express.Router();
const foodapi = process.env.API_KEY;

router.get("/", (req, res)=>{
  var url = 'https://api.edamam.com/api/food-database/v2/parser?ingr=red%20apple' + foodapi;

  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    res.json(text)
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.setRequestHeader('Content-Type', 'application/json');
  
});
// router.post("/", AuthorController.addAuthor);

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

module.exports = router;