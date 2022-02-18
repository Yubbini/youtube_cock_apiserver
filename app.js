const express = require('express')
const app = express();
const port = process.env.PORT || 80;
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log(err);
    });

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))