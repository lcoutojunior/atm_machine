import express from 'express';
import bodyParser from 'body-parser';
import UserController from './controllers/User.js';
import {connectDB} from "./db/Connection.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('test');
});

app.use(bodyParser.json());
app.use(UserController);

connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
}).catch((e) => console.error(e));
  

  