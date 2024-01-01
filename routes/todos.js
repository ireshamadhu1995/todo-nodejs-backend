const express = require("express");
const router = express.Router();
const todos = require("../services/todos");

const app = express()

/* GET all todos */
router.get("/", async function (req, res, next) {
  try {
    res.json(await todos.getMultiple(req.query.search));
  } catch (err) {
   
    next(err);
  }
});

/* insert todo details */
router.post("/", async function (req, res, next) {
  try {
    
    res.json(await todos.create(req.body));
  } catch (err) {
 
    next(err);
  }
});

/* PUT todos */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await todos.update(req.params.id, req.body));
  } catch (err) {
    
    next(err);
  }
});

/* DELETE todos */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await todos.remove(req.params.id));
  } catch (err) {
    
    next(err);
  }
});

/* Get by id todos */
router.get("/:id", async function (req, res, next) {
    try {
      res.json(await todos.getById(req.params.id));
    } catch (err) {
      
      next(err);
    }
  });

module.exports = router;
