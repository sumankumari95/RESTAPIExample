// var express = require("express");
import express from "express";
const app = express();
import bodyParser from "body-parser";
import jsondata from "./movies.json";
import _und from "underscore";
import morgan from "morgan";

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const router = express.Router();
app.use("/api", router);

router.get("/", function(req, res) {
  res.json(jsondata);
});

router.post("/postdata", function(req, res) {
  if (req.body.Id && req.body.Title) {
    jsondata.push(req.body);
    res.json(jsondata);
  } else {
    console.log("Headers are not passed to create data");
  }
});

router.put("/updatedata/:id", function(req, res) {
  if (req.params.id) {
    _und.each(jsondata, function(elem, index) {
      if (elem.Id === req.params.id) {
        elem.Title = "Hello Brother";
        elem.Director = "unknown";
      }
    });
  } else {
    console.log("Invalid request");
  }
  res.json(jsondata);
});

router.delete("/deletedata/:id", function(req, res) {
  getindextodelete = -1;
  if (req.params.id) {
    _und.each(jsondata, function(elem, index) {
      if (elem.Id === req.params.id) {
        getindextodelete = index;
      }
    });
    if (getindextodelete > -1) {
      jsondata.splice(getindextodelete, 1);
    }
  } else {
    console.log("Invalid request");
  }
  res.json(jsondata);
});

app.listen(port, () => console.log("listening..."));

// import * as bodyParser from "body-parser";
// import * as jsondata from "./movies.json";
// import _und from "underscore";
// let app = express();
