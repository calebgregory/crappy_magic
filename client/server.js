const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'static')))

app.listen(3001, (err) => {
  if (err) {
    console.error("Oops", err)
    return
  }
  console.log("Client listening at http://localhost:3001")
})
