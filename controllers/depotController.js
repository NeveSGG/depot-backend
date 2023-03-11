const {Depot} = require('../models/model')
const ApiError = require('../error/ApiError')

class DepotController {

  async addDepot (req, res, next) {
    try {
      const {isExternal, bankExternal, innExternal, adressExternal} = req.body
      const depot = await Depot.create({
        isExternal, bankExternal, innExternal, adressExternal
      })
      return res.json(depot)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
    
  }

  async getDepot (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const depot = await Depot.findOne({
        where: {depotKey: id}
      })
      return res.json(depot)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async removeDepot (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const depot = await Depot.findOne({
        where: {depotKey: id}
      })
      if (!depot) {
        return next(ApiError.badRequest('Запись не найдена'))
      } else {
        await depot.destroy()
      }
      return res.json({message: 'Запись удалена'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAllDepots (req, res, next) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 10
      const offset = limit*page;
      const depots = await Depot.findAndCountAll({limit, offset})
      return res.json(depots)
    } catch(e) {
      next(ApiError.badRequest(e.message))
    }
    
  }

}

module.exports = new DepotController()