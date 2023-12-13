const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const listingRouter = require('./routes/listing.route');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

const app = express();


app.use(cors())
mongoose
  .connect("mongodb+srv://postmantesting205:WsexBYN9jUvDva4U@freecluster.mxy86qc.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });




app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});


app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
