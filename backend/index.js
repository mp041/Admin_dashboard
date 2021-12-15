require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const cookieParser = require('cookie-parser')
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors());
app.use('/user',require('./routes/auth'));
app.use('/user',require('./routes/adminAuth/adminAuth'));
app.use('/api',require('./routes/category'))
app.use('/api',require('./routes/products'))
app.use('/api',require('./routes/cart'));



PORT = process.env.PORT || 5000;



const URI = process.env.MONGODB_URL

mongoose.connect(URI,{
  useNewUrlParser : true,
  useUnifiedTopology : true,
}, err => {
  if(err) throw err;
   console.log('Connected to Mongodb');
});
//
// app.get("/",(req,res) => {
//   res.json("Getting data success");
// })
//
// app.post('/',(req,res) => {
//    res.json("Sending data success");
// })
//


app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`)
})
