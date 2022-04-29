const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

//importing createItem from controllers/index.js in line 7
// and so forth all from the controllers folder
router.get('/', (req, res) => res.send('This is the root!'))
router.post('/items', controllers.createItem)
router.get('/items', controllers.getAllItems)
router.get('/items/:id', controllers.getItemById)
router.put('/items/:id', controllers.updateItem)
router.delete('/items/:id', controllers.deleteItem)

//put updates the whole id/document and patch updates individual objects

module.exports = router