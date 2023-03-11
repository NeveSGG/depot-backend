const {Chief} = require('../models/model')
const ApiError = require('../error/ApiError')

class ChiefController {

  async addChief (req, res, next) {
    try {
      const {fioChief, base} = req.body
      const chief = await Chief.create({
        fioChief, base
      })
      return res.json(chief)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getChief (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const chief = await Chief.findOne({
        where: {chiefKey: id}
      })
      return res.json(chief)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async removeChief (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const chief = await Chief.findOne({
        where: {chiefKey: id}
      })
      if (!chief) {
        return next(ApiError.badRequest('Запись не найдена'))
      } else {
        await chief.destroy()
      }
      return res.json({message: 'Запись удалена'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAllChiefs (req, res, next) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 10
      const offset = limit*page;
      const chiefs = await Chief.findAndCountAll({limit, offset})
      return res.json(chiefs)
    } catch(e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ChiefController()