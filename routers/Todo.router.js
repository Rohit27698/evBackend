const express = require('express');
const { TodoModel } = require('../modal/Todo.model')





const TodoRouter = express.Router()


TodoRouter.get('/', async (req, res) => {

    const userID = {
        author_id: req.userID
    };
    try {
        const Todo = await TodoModel.find(userID)

        res.status(200).send({ "Todo": Todo })

    } catch (error) {
        res.status(404).send(error)

    }

})

TodoRouter.post('/', async (req, res) => {

    const { taskname, status, tag } = req.body;
    const author_id = req.userID;
    try {
        await TodoModel.create({ taskname, status, tag , author_id: author_id, })
        res.send("Todo created Succecfully")
    } catch (error) {
        res.status(404).send("internal server error");
    }
})
TodoRouter.patch('/:todoid', async (req, res) => {
    const id = req.params.todoid
    
    const payload = req.body;
    const author_id = req.userID;
    const todo = await TodoModel.findOne({ _id: id })
    console.log(todo)
    if(!todo){
        return res.send("todo not found")
     }

    if (todo?.author_id === author_id) {
        await TodoModel.findByIdAndUpdate(id, payload)
        res.send("Todo Updated Succecfully")
    } else {
        res.status(404).send("You are not authorize");
    }

})
TodoRouter.delete('/:todoid', async (req, res) => {
    const id = req.params.todo
    const author_id = req.userID;
    const todo = TodoModel.findOne({ _id: id })
    if(!todo){
       return res.send('blog not found')
       
    }
    if (todo?.author_id === author_id) {
        await TodoModel.findByIdAndDelete(id)
        res.send("Blog Deleted Succecfully")
    } else {
        res.status(404).send("You are not authorize");
    }
})


module.exports = { TodoRouter }