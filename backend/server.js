const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cors = require('cors');

app = express();

app.use(express.json());
app.use(express.static("../frontend/"));


const mongoUrl = 'mongodb://localhost:27017'; // Change this to your MongoDB connection string
const dbName = 'vidrates';

mongoose.connect(mongoUrl+"/"+dbName)
.then(() => {
  console.log("db connected");
}).catch((err) => {
  console.error(err)
}); 

const userSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  rating:{
    type: Number
  },
  ratings:{
    type: Number
  }
});

const Videos = mongoose.model("videos",userSchema);


//used it once for inserting data in database
async function insertData() {
    const client = new MongoClient(mongoUrl,{useNewUrlParser: true,useUnifiedTopology: true});
  
    try{
      await client.connect();
      console.log("Connected to MongoDB");
  
      const db = client.db(dbName);
      const collection = db.collection('videos');
  
      const result = await collection.insertMany(data);
      console.log(`Inserted ${result.insertedCount} documents`);
  
    }catch(err){
      console.error("Error inserting data:", err);
    }finally{
      await client.close();
    }
}

async function getRandomVideo() {
  //todo - implement this using mongoose
  try{
    const count = await Videos.countDocuments(); // Get total document count
    const random = Math.floor(Math.random() * count); // Generate random index
    const randomvideo = await Videos.findOne().skip(random); // Skip to that index

    return randomvideo
  }catch(error){
    console.error("Error fetching random document:", error);
  }
  return null
}

async function updateRating(data){
    try{
        await Videos.updateOne({url:data.url},{rating:data.rating,ratings:data.ratings})
        console.log("updated the data for video url - " + data.url);
    }catch(error){
        console.error("error updating data -> " + error);
    }
}

app.get("/api/geturl", async (req,res) => {
try{

  const uri = await getRandomVideo();
  console.log(uri);
  res.status(200).json(uri);
}catch(e){
    console.error("error here -> " + e);
}
});

app.patch("/api/submitrating", async (req,res) => {
    try{
        console.log(req.body);
        await updateRating(req.body);
        res.send("update successful");
    }catch(err){
        res.status(500).send("error while updating data ->" + e);
    }
})

app.listen(8080, () =>{
    console.log("listening at port 8080");
  }
);

