const Router = require('express')
const router = new Router()
const bonusController = require('../controllers/bonusController')

router.post('/post', bonusController.addBonus)
router.get('/getAll', bonusController.getAllBonuss)
router.get('/get', bonusController.getBonus)
router.delete('/delete', bonusController.removeBonus)

module.exports = router