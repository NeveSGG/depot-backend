const Router = require('express')
const router = new Router()
const workerController = require('../controllers/workerController')

router.post('/post', workerController.addWorker)
router.get('/getAll', workerController.getAllWorkers)
router.get('/get', workerController.getWorker)
router.delete('/delete', workerController.removeWorker)

module.exports = router