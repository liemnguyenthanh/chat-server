
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import http from 'http'
import cors from "cors";
import SocketIO from './socket/index.js';
const app = express();
const server = http.createServer(app);

import userRoutes from "./routers/user.js";
import messageRoutes from "./routers/messages.js";
import roomRoutes from "./routers/room.js";
import { mongoose } from 'mongoose';
import bodyParser from 'body-parser';

const uri_db = "mongodb+srv://ducmanh1808:ducmanh1808@cluster0.t31y6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const option_db ={
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(
    uri_db,
    option_db
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log("erorr : " ,e));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/room",roomRoutes);

SocketIO(server)

server.listen(process.env.PORT || 8080, () => console.log(`Server has started.`));