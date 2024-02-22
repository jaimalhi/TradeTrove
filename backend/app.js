const express = require('express')
const path = require('path')
const app = express()
const port = 3001

app.use(express.static(path.join(__dirname,"..","frontend","build")));
app.use(express.json());


app.put("/login",(req,res)=>{
    console.log(req.body);
    console.log("Authentication done: \n");
    res.send({access_token:`${req.body}`}) //add it to the DB
})



app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});