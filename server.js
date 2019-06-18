const express = require('express');

const server = express();

// your code here
const Budgets = require('./data/accounts-model')
server.use(express.json());

server.get('/', async (req, res) => {
    const greeting = 'Welcom to the Budgets DataBase'
    res.status(200).json(greeting)
});

server.get('/accounts', async (req, res) => {
const budgets = await Budgets.find(req.query)
res.status(200).json(budgets)
})

server.get('/accounts/:id', async (req, res) => {
    const {id} = req.params;
    const budget = await Budgets.findById(id)
    res.status(200).json(budget)
})

server.put('/accounts/:id', async (req, res) => {
    try{
        const budget = await Budgets.update(req.params.id, req.body)
        if(budget) {
            res.status(200).json(budget)
        }else{
            res.status(404).json({message: 'The Budget can not be found'})
        }
    }catch(error) {
        console.log(error)
        res.status(500).json({
            message: 'Error Updating'
        })
    }
})

server.delete('/accounts/:id', async (req, res) => {
    const count = await Budgets.remove(req.params.id)
    if(count > 0) {
        res.status(200).json({ message: 'Budget Removed'})
    } else{
        res.status(404).json({ message: 'Budget Not Found'})
    }
})

server.post('/accounts', (req, res) => {
    const budget = Budgets.add(req.body);
    res.status(201).json(budget)
})

module.exports = server;