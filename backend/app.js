const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req,res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfuly'
  });
});


app.get("/api/posts",(req, res, next) => {

  const posts = [
    {id: "123ADS", title: "first post", content: "my first post from the server"},
    {id: "123ADS1", title: "sencode post", content: "my second post from the server"}
  ];

  res.status(200).json({
    message: "posts fetched sucessufly",
    posts: posts
  });
});


module.exports = app;
