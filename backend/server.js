const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const app = require('express')();

let urllist = ['c2M-rlkkT5o','btdLnB9PXuY','-dUiRtJ8ot0','K1a2Bk8NrYQ','lCBnO60kBGc',
    'oqSYljRYDEM','-bt_y4Loofg','SMQc4umq3gg','vWq-pbBRPUg','v-rxiEEM7BY','K3m-VeDSoUo',
    'I7muKz0hVKQ','eN9XX-dd0LQ','4iNqAhCtbmQ','O3XUQ1xKZb0','d7jbfeL-em8','14Rd_h9V4tQ'
];


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
}

const server = http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    let filePath = path.join(__dirname, '../frontend', pathname === '/' ? 'index.html' : pathname);
        fs.readFile(filePath, (err, content) => {
        
          if(err){
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
            return;
          }
          //setting mime
          let contentType = 'text/html';
          if (pathname.endsWith('.css')) contentType = 'text/css';
          if (pathname.endsWith('.js')) contentType = 'application/javascript';
    
          //this runs if content is valid
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        });
});

app.get("/", (req,res) =>{
  let uri = getRandomVideo();
  //console.log(uri.url);
  res.status(200).send("working fine")
});

app.listen(
  8080, () =>{
    console.log("listening at port 8080");
  }
);

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});
