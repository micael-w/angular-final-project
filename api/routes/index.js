var express = require('express');
var router = express.Router();
const ObjectID = require("mongodb").ObjectID;

// GET ENDPOINT

router.get("/posts", (req, res, next) => {
  // GET ALL POSTS IN COLLECTION
  req.collection.find({})
  // MAKE INTO ARRAY
  .toArray()
  // RETURN PROMISE AS JSON
  .then((results) => res.json(results))
  // CATCH ERROR
  .catch((error) => res.send(error));
});

// POST ENDPOINT


router.post("/posts", (req, res, next) => {
  const { title, body, author } = req.body;
  // CHECK IF ALL VALUES ARE TRUTHY
  if (!title || !body || !author) {
    // OTHERWISE THROW ERROR WITH 400 AND MESSAGE
    return res.status(400).json( {
      message: "All fields are required"
    });
  }

  // IF ALL VALUES ARE PRESENT WE CARRY ON WITH
  // CONSTRUCTING A PAYLOAD WITH CURRENT TIME

  let postDate = new Date(Date.now())
  const payload = { title, body, author, postDate};
  // INSERT INTO MONGO COLLECTION
  req.collection.insertOne(payload)
  // RETURN THE RESULT IN JSON FORMAT
  // SPECIFICALLY THE FIRST OBJECT IN
  // THE OBS ARRAY
    .then((result) => res.json(result.ops[0]))
    .catch((error) => res.send(error));
})

// DELETE ENDPOINT

router.delete("/posts/:id", (req, res, next) => {
  // EXTRACT ID FROM PARAMETERS
  const { id } = req.params;
  // USE MONGODB FUNCTION TO SPECIFY ID
  const _id = ObjectID(id);

  // DELETE THE POST WITH THAT ID
  req.collection.deleteOne({ _id })
    .then((result) => res.json(result))
    .catch((error) => res.send(error));
});


module.exports = router;
