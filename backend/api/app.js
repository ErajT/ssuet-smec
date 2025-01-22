const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const UserRoutes = require('./Routers/UserRouters');
const NGORoutes = require('./Routers/NGORouters');
const userRouter = require('./api/user/user.router');

let app = express();
app.options('*', cors()); // Allow preflight requests

// Middleware to enable CORS
app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'https://learn-nmuga4b6l-erajts-projects.vercel.app'); // Adjust the origin as needed
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); 
  next();
});

app.use(cors({
  // origin: 'https://learn-nmuga4b6l-erajts-projects.vercel.app', // Allow requests from frontend application
  origin: 'http://localhost:5173',
  credentials: true // Allow credentials (cookies) to be included with requests
}));

app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));


//middleware for request body
app.use(express.json());
app.use('/Users', UserRoutes);
app.use('/user', userRouter);
app.use('/NGO', NGORoutes);

app.listen(2000,()=>{
  console.log("Server has started");
})

module.exports = app;