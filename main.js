const { urlencoded } = require("express");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(getWeather);

function getWeather(req, res, next) {
  req.visitorWeather = false;
  if (req.visitorWeather) {
    res.send("Please come back to our app when it is not raining");
  } else {
    next();
  }
}

app.get("/", (req, res) => {
  res.send(`
  <h1>What color is the sky?</h1>
  <form action="/result" method="POST">
  <input type="text" name="color">
  <button> Submit Answer</button>
  </form>
  <p> ${req.getWeather ? "It is raining" : "It is not raining"}</p>
  
  
  `);
});

app.get("/about", (req, res) => {
  res.send("Thanks");
});

app.post("/result", (req, res) => {
  if (req.body.color.trim().toUpperCase() === "BLUE") {
    res.send("congrats, that is correct");
  } else {
    res.send("Wrong, pls try again");
  }
  //res.send("thanks for submitting");
});

app.get("/result", (req, res) => {
  res.send("Why are you using this URL?");
});

app.listen(3000);
