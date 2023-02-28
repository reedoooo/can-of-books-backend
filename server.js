'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require("axios");

// const mongoose = require("mongoose");
// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/test");

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }
// main().catch((err) => console.log(err));

function getApi(req, res, next) {
  let api = req.query.searchQuery;
  let apiUrl = `${process.env.DATABASE_URL}`;

  axios
    .get(apiUrl)
    .then((response) => {
      let liveInfo = response.data.results
      res.status(200).send(liveInfo);
    })
    .catch((error) => next(error));
}


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// app.get('/test', (request, response) => {
//   response.send('test request received')
// })
app.get("/books", getApi);

// app.get("/books", (request, response) => {
//   response.send("books");
// });

app.listen(PORT, () => console.log(`listening on ${PORT}`));
