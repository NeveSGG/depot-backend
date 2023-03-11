const Router = require('express')
const router = new Router()
const chiefController = require('../controllers/chiefController')

router.post('/post', chiefController.addChief)
router.get('/getAll', chiefController.getAllChiefs)
router.get('/get', chiefController.getChief)
router.delete('/delete', chiefController.removeChief)

module.exports = router