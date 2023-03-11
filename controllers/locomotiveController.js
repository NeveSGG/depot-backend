const ApiError = require('../error/ApiError')
const {Locomotive} = require('../models/model')

class LocomotiveController {
  
  async addLocomotive (req, res, next) {
    try {
      const {regNumber, kindValue, typeValue, typeYear, picture, regName, DepotDepotKey} = req.body
      const locomotive = await Locomotive.create({
        regNumber, kindValue, typeValue, typeYear, picture, regName, DepotDepotKey
      })
      return res.json(locomotive)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
    
  }

  async getLocomotive (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const locomotive = await Locomotive.findOne({
        where: {locomotiveKey: id}
      })
      return res.json(locomotive)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async removeLocomotive (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const locomotive = await Locomotive.findOne({
        where: {locomotiveKey: id}
      })
      if (!locomotive) {
        return next(ApiError.badRequest('Запись не найдена'))
      } else {
        await locomotive.destroy()
      }
      return res.json({message: 'Запись удалена'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAllLocomotives (req, res, next) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 10
      const offset = limit*page;
      const locomotives = await Locomotive.findAndCountAll({limit, offset})
      return res.json(locomotives)
    } catch(e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new LocomotiveController()