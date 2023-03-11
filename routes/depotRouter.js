const Router = require('express')
const router = new Router()
const depotController = require('../controllers/depotController')

router.post('/post', depotController.addDepot)
router.get('/getAll', depotController.getAllDepots)
router.get('/get', depotController.getDepot)
router.delete('/delete', depotController.removeDepot)

module.exports = router