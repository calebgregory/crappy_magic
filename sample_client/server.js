const express = require('express');
const app = express();

app.get('/', express.static('public'))

app.listen(3001, (err) => {
  if (err) {
    console.error("Oops", err)
    return
  }
  console.log("listening at http://localhost:3001")
})
