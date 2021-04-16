const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.use(express.static("public"));
app.use(bodyParser({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure.html", function(req, res){
  res.redirect("/");
});
app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;


  var data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us1.api.mailchimp.com/3.0/lists/5811922b52",
    method: "POST",
    headers: {
      "Authorization": "ahmed 174f83a83af03babaccc504efde43047-us1"
    },
    body: jsonData,
  };


  request(options, function(error, response, body){
    if (response.statusCode === 200) {

        res.sendFile(__dirname + "/success.html");

    } else {

        res.sendFile(__dirname + "/failure.html");

    }
  });
});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});

// API keys
// 174f83a83af03babaccc504efde43047-us1

// audience or list id
// 5811922b52
