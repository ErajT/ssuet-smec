const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const UserRoutes = require('./Routers/UserRouters');
const NGORoutes = require('./Routers/NGORouters');
const userRouter = require('./api/user/user.router');

let app = express();
// Middleware to parse JSON
app.use(express.json());

// Enable CORS only for your frontend origin
const corsOptions = {
  origin: ['http://localhost:3000', 'rewear-hub.vercel.app'],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

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