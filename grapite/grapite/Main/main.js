const express = require('express');
const app = express();
const requests = require('./routes/requests');
const schedule = require('node-schedule');
const { deletescript } = require('./Delete/delscript')
app.use(express.json())
app.use('/grapite',requests)

async function deleter(){
    schedule.scheduleJob('*/1 * * * *', async function(){
        try {
            await deletescript();        
        } catch (error){
            console.log(error);
        } 
    });
    
}

app.listen(5000,function(){
    deleter();
    console.log("- Grapite running")
    console.log("- Pathfinder: http://127.0.0.1:5000/grapite")
})