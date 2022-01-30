const path = require('path')
const dbController = require('./controllers/dbController.js')

const express = require('express')
const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('build'))

app.get('/api/getTodos', 
    dbController.getItems,
    (req, res) => {
        return res.status(200).json(res.locals.todos)   
    }
)

app.post('/api/addTodo', 
    dbController.addItem, 
    (req, res) => {
        return res.status(200).json(res.locals.newTodo) 
    }
)

app.delete('/api/deleteTodo/:id',
    dbController.deleteItem,
    (req, res) => {
        return res.status(200).json(res.locals.deleted)
    }
)

if (process.env.NODE_ENV == 'production') {
    app.get('/', (req, res) => {
        res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
    })
    
    app.get('/build/bundle.js', (req, res) => {
        res.status(200).sendFile(path.resolve(__dirname, '../build/bundle.js'))
    })
}

app.use('*', (req, res) => {
    res.status(400).send('Error: invalid route')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${3000}`)
})