
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3100;

app.use(cors()); // Використовувати middleware cors

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:1234@cluster0.bivkeoa.mongodb.net/?retryWrites=true&w=majority";

const dbName = "project"; // Назва вашої бази даних
const collectionName = "products"; // Назва колекції, з якої ви хочете зчитувати дані

app.get('/data', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const query = {}; 
    const documents = await collection.find(query).toArray();

    res.json(documents);
  } catch (error) {
    console.error('Error reading from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

