const Router = require('express')
const router = new Router()
const locomotiveController = require('../controllers/locomotiveController')

router.post('/post', locomotiveController.addLocomotive)
router.get('/getAll', locomotiveController.getAllLocomotives)
router.get('/get', locomotiveController.getLocomotive)
router.delete('/delete', locomotiveController.removeLocomotive)

module.exports = router