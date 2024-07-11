import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = "project_management";

const app = express();
app.use(cors());
const PORT = 3000;

app.get("/projects", async (req, res) => {
  const collectionName = "projects";
  console.log("fetching projects");

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const projects = await collection.find({}).toArray();
    res.json(projects)
  } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error occured while fetching projects.")
  }
});


app.post("/projects", async (req, res) => {
    const collectionName = "projects";
    try {
        // TODO: Add code that adds a sock when a new sock is posted using the
        // Add Sock form.        
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const status = await collection.insertOne(req.body);
        res.status(200).send(status);
      } catch (err) {
        console.error("Error:", err);
        res
          .status(500)
          .send("Error while posting project.");
      }
});

app.post("/tasks", async (req, res) => {
    const collectionName = "tasks";
    try {
        // TODO: Add code that adds a sock when a new sock is posted using the
        // Add Sock form.        
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const status = await collection.insertOne(req.body);
        res.status(200).send(status);
      } catch (err) {
        console.error("Error:", err);
        res
          .status(500)
          .send("Error while posting task.");
      }
});

app.delete("/projects/:id", async (req, res) => {
    const collectionName = "projects";
    try {
      // TODO: Add code that delete a sock when its delete button is clicked.
      const client = await MongoClient.connect(url);
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const { id } = req.params;
      const status = await collection.deleteOne({ "_id": new ObjectId(id) });
      res.send(status);
    } catch (err) {
      console.error("Error:", err);
      res
        .status(500)
        .send("error deleting project");
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
