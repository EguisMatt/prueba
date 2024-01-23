import express from 'express';
import cors from 'cors';
import { PORT } from './config/config';
import { postrouter } from './routes/post.router';
const app = express()

app.use(express.json())
app.use(cors())

app.listen(PORT, () =>{
  console.log(`server is running on PORT ${PORT}`);
})

app.use("/api",postrouter)