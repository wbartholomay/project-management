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
app.use(express.json());
const PORT = 3000;

async function getItem(collectionName, req, res) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const projects = await collection.find({}).toArray();
    res.json(projects);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error occured while fetching projects.");
  }
}

async function postItem(collectionName, req, res) {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    let document = req.body;
    console.log(`Inserting document: ${document}`);
    const status = await collection.insertOne(document);
    res.status(200).send(status);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while posting project.");
  }
}

async function deleteItem(collectionName, req, res) {
  try {
    // TODO: Add code that delete a sock when its delete button is clicked.
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const { id } = req.params;
    const status = await collection.deleteOne({ _id: new ObjectId(id) });
    res.send(status);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("error deleting project");
  }
}

async function putItem(collectionName, req, res) {
  try {
    const { id } = req.params;
    const updatedProject = req.body;

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedProject }
    );

    res.send("Document updated successfully.");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error updating project");
  }
}

app.get("/projects", async (req, res) => {
  await getItem("projects", req, res);
});

app.get("/projects/:user", async (req, res) => {
  //returns all tasks assigned to a project given a project ID
  const collectionName = "projects";

  try {
    const { user } = req.params;

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const tasks = await collection
      .find({ teamMembers: { $in: [user] } })
      .toArray();
    res.json(tasks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error occured while fetching projects.");
  }
});

app.get("/tasks", async (req, res) => {
  await getItem("tasks", req, res);
});

app.get("/tasks/:id", async (req, res) => {
  //returns all tasks assigned to a project given a project ID
  const collectionName = "tasks";

  try {
    const { id } = req.params;

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const tasks = await collection.find({ projectId: id }).toArray();
    res.json(tasks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error occured while fetching projects.");
  }
});

app.get("/users", async (req, res) => {
  await getItem("users", req, res);
});

app.post("/projects", async (req, res) => {
  await postItem("projects", req, res);
});

app.post("/tasks", async (req, res) => {
  await postItem("tasks", req, res);
});

app.post("/register", async (req, res) => {
  await postItem("users", req, res);
});

app.post("/login", async (req, res) => {
  const collectionName = "users";
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    let {username, password} = req.body;
    console.log(`Username: ${username}, Password: ${password}`)

    const result = await collection.find({'username' : username}, {'password': password}).toArray();
    console.log(result);
    if(result.length > 0){
      res.status(200).json({uid : result[0]._id});
    }
    else{
      res.status(401).json({ message: 'Authentication failed' });
      console.log(result);
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error occured while authenticating login.");
  }
});

app.delete("/projects/:id", async (req, res) => {
  await deleteItem("projects", req, res);
});

app.delete("/tasks/:id", async (req, res) => {
  await deleteItem("tasks", req, res);
});

app.delete("/users/:id", async (req, res) => {
  await deleteItem("users", req, res);
});

app.put("/projects/:id", async (req, res) => {
  await putItem("projects", req, res);
});

app.put("/tasks/:id", async (req, res) => {
  await putItem("tasks", req, res);
});

app.put("/users/:id", async (req, res) => {
  await putItem("users", req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
