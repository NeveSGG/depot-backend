const Router = require('express')
const router = new Router()

const bonusRouter = require('./bonusRouter')
const chiefRouter = require('./chiefRouter')
const depotRouter = require('./depotRouter')
const locomotiveRouter = require('./locomotiveRouter')
const repairRouter = require('./repairRouter')
const workerRouter = require('./workerRouter')

router.use('/bonus', bonusRouter)
router.use('/chief', chiefRouter)
router.use('/depot', depotRouter)
router.use('/locomotive', locomotiveRouter)
router.use('/repair', repairRouter)
router.use('/worker', workerRouter)

module.exports = router