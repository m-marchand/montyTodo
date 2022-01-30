const db = require('../db/model.js')
const dbController = {}

dbController.getItems = (req, res, next) => {
    db.find({})
        .then(items => {
            console.log(items)
            res.locals.todos = items;
            return next()
        })
        .catch(err => {
            res.status(400).send('Error: ' + err)
        })
}

dbController.addItem = (req, res, next) => {
    console.log(req.body)
    const newItem = req.body.item;
    db.create({task: newItem})
        .then(newItem => {
            res.locals.newTodo = newItem;
            return next()
        })
        .catch(err => {
            return res.status(400).send('Error: ' + err);
        })
}

dbController.deleteItem = (req, res, next) => {
    console.log(req.params);
    const { id } = req.params;
    db.findOneAndDelete({ '_id': id })
        .then(deletedItem => {
            console.log(deletedItem)
            res.locals.deleted = deletedItem;
            return next()
        })
        .catch(err => {
            return res.status(400).send('Error: ' + err);
        })
}

module.exports = dbController