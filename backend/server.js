const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

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
async function findVideo(vidurl) {
    try{
      const video = await Videos.findOne({url:vidurl}); 
      //console.log(video)
      if(video==null){
        return {};
      }
      return video
    }catch(error){
      console.error("Error fetching searched video :", error);
    }
    return null
}

findVideo('2k38o_uzi0U')
  

async function updateRating(data){
    try{
        await Videos.updateOne({url:data.url},{rating:data.rating,ratings:data.ratings},{upsert:true})
        //console.log("updated the data for video url - " + data.url);
    }catch(error){
        console.error("error updating data -> " + error);
    }
}

app.get("/api/geturl", async (req,res) => {
try{

  const uri = await getRandomVideo();
  //console.log(uri);
  res.status(200).json(uri);
}catch(e){
    console.error("error here -> " + e);
}
});

app.patch("/api/submitrating", async (req,res) => {
    try{
        //console.log(req.body);
        await updateRating(req.body);
        res.send("update successful");
    }catch(err){
        res.status(500).send("error while updating data ->" + err);
    }
})

app.get("/api/getkey", async (req,res)=>{
    try{
        res.header("Content-Type",'application/json');
        res.sendFile(path.join(__dirname, 'client_secret.json'));
    }catch(err){
        res.status(500).send("error while getting api key ->" + err)
    }
})

app.get("/api/findvid/:url", async (req, res) => {
    try{
        const data = await findVideo(req.params.url.slice(1));
        res.json(data);
        
    }catch(err){
        res.status(500).send("error while getting searched video url -> " + err);
    }
})

app.listen(8080, () =>{
    console.log("listening at port 8080");
  }
);

