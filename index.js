const express = require('express');
const{UserRouter}=require('./routers/User.router')
const{TodoRouter}=require('./routers/Todo.router')
const {connect}=require('./DB/db')
const{Authenticate}=require('./middilewere/Authenticate');
const cors=require('cors')
require("dotenv").config()


const PORT=process.env.PORT


const app = express();
app.use(cors({
    origin:"*"
}))



app.use(express.json())

app.get('/', (req, res) => {
    res.send("this is BaseApi")
})



app.use("/user", TodoRouter)


app.use(Authenticate)
app.use('/todos', UserRouter)




app.listen(PORT, async() => {
    try {
        await connect
        console.log("db connected Sucsessfully")
    } catch (e) {
        console.log(e)
        
    }
    console.log(`port is running on ${PORT}`)
})