import express from 'express'
import cors from 'cors'
import connect from './config/connection.js';
import indexRoute from './routes/indexRoute.js'
const app = express()
const port = 5000

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    })
    );
    app.use(express.urlencoded({extended:false}))
    app.use(express.json());
app.use('/',indexRoute)
connect()
app.listen(port,()=>{
    console.log(`server starts on port ${port}`);
})