import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import MongoClient from "mongodb";

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/getHabitos", (req, res) => {
  connect(
    loadFunc,
    "habitos",
    res
  );
});

app.get("/getAllpoints", (req, res) => {
  connect(
    loadFunc,
    "instituicoes",
    res
  );
});

const loadFunc = (db, type, res) => {
  let database = db.db("fiquebem");
  database
    .collection(type)
    .find({})
    .toArray((err, doc) => {
      res.send(doc);
      db.close();
      res.end();
    });
};
const connect = (thenFunc, where, res) => {
  MongoClient.connect(
    "mongodb://peitro:peitrogay1@ds111244.mlab.com:11244/fiquebem",
    (err, db) => {
      if (!err) thenFunc(db, where, res);
    }
  );
};

const PORT = process.env.PORT || 8080;

app.listen(PORT, function(req, res) {
  console.log("Server Running on " + PORT);
});
