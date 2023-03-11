const Router = require('express')
const router = new Router()
const repairController = require('../controllers/repairController')

router.post('/post', repairController.addRepair)
router.get('/getAll', repairController.getAllRepairs)
router.get('/get', repairController.getRepair)
router.delete('/delete', repairController.removeRepair)

module.exports = router