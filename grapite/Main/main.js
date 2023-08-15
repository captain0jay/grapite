const express = require('express');
const app = express();
const requests = require('./routes/requests');

app.use(express.json())
app.use('/grapite',requests)

app.listen(5000,function(){
    console.log("listening to port 5000")
    console.log("- Pathfinder: https://127.0.0.1:5000/")
})