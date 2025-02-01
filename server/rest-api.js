var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var conString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post("/contact",(req,res)=>{
    var clientDetails = {
        Name:req.body.name,
        MailId:req.body.email,
        PhoneNo:req.body.phone,
        Message:req.body.message
    }

    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db("rsphotography");
        database.collection("clientDetails").insertOne(clientDetails).then(()=>{
            console.log(`record inserted`);
            res.end();
        })
    })
})

app.listen(7070);
console.log(`Server Started : http://127.0.0.1:7070`);