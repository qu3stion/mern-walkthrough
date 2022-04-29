// controllers are logic that handles all CRUD requests

const Item = require('../models/item')

//creating item request
//taking everything inside and saving it to the 'Item' schema in models/item.js
// save is a method from mongo for saving to database

//status codes 201 and 200 mean 'good' and 500 is 'error
//  201 is used when creating and 200 is used for 'read'
const createItem = async (req, res) => {
    try {
        const item = await new Item(req.body)
        await item.save()
        return res.status(201).json({
            item,
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//fetching whole database
//   error 201 is used
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find()
        return res.status(200).json({ items })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id)
        if (item) {
            return res.status(200).json({ item });
        }
        return res.status(404).send('Item with that ID does not exist..')


    } catch (error) {
        return res.status(500).send(error.message)
    }
}

// item update 
// findByIdAndUpdate is supplied by MongoDB
// request.body will be holding the updated data
const updateItem = (req, res) => {
    try {
        const { id } = req.params;
        Item.findByIdandUpdate(
            id, req.body, { new: true }, (err, item) => {
                if (err) {
                    res.status(500).send(err)
                }
                if (!item) {
                    res.status(500).send('Item not found');
                }
                return res.status(200).json(items);
            }
        )

    } catch (error) {
        return res.status(500).send(error.message)

    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Item.findByIdandUpdate(id);
        if (deleted) {
            return res.status(200).send('Item Deletd')
        }
        throw new Error('Item Not Found')
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
}