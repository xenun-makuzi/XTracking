const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.get('/track',(req,res)=>{
    const number = req.query.number;
    if(!number) return res.status(400).json({error:'Tracking number is required'});
    
    fs.readFile('trackingData.json','utf8',(err,data)=>{
        if(err) return res.status(500).json({error:'Server Error'});
        const tracking = JSON.parse(data);
        const result = tracking[number.toUpperCase()];
        if(result){
            res.json(result);
        }else{
            res.status(404).json({
                error:'Tracking Number not found'
            });
        }
    });
});
app.listen(PORT,()=>{
    console.log(`XTracking backend is running on http://localhost:${PORT}`);
});