import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const db = "project_management";

const app = express();
app.use(cors);
const PORT = 3000;

app.get("/projects", async (req, res) => {
  collectionName = "projects";

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


