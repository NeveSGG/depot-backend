const {Bonus} = require('../models/model')
const ApiError = require('../error/ApiError')

class BonusController {

  async addBonus (req, res, next) {
    try {
      const {bonusWorker, comment, bonusType, WorkerWorkerKey} = req.body
      const bonus = await Bonus.create({
        bonusWorker, comment, bonusType, WorkerWorkerKey
      })
      return res.json(bonus)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getBonus (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const bonus = await Bonus.findOne({
        where: {bonusKey: id}
      })
      return res.json(bonus)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async removeBonus (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const bonus = await Bonus.findOne({
        where: {bonusKey: id}
      })
      if (!bonus) {depot
        return next(ApiError.badRequest('Запись не найдена'))
      } else {
        await bonus.destroy()
      }
      return res.json({message: 'Запись удалена'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAllBonuss (req, res, next) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 10
      const offset = limit*page;
      const bonuss = await Bonus.findAndCountAll({limit, offset})
      return res.json(bonuss)
    } catch(e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new BonusController()