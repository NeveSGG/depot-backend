const {Repair} = require('../models/model')
const ApiError = require('../error/ApiError')

class RepairController {

  async addRepair (req, res, next) {
    try {
      const {dateStart, dateStop, reasonValue, typeRepair, bonus, money, bonusPercent, ChiefChiefKey, LocomotiveLocomotiveKey} = req.body
      const repair = await Repair.create({
        dateStart, dateStop, reasonValue, typeRepair, bonus, money, bonusPercent, ChiefChiefKey, LocomotiveLocomotiveKey
      })
      return res.json(repair)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
    
  }

  async getRepair (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const repair = await Repair.findOne({
        where: {repairKey: id}
      })
      return res.json(repair)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async removeRepair (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const repair = await Repair.findOne({
        where: {repairKey: id}
      })
      if (!repair) {
        return next(ApiError.badRequest('Запись не найдена'))
      } else {
        await repair.destroy()
      }
      return res.json({message: 'Запись удалена'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAllRepairs (req, res, next) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 10
      const offset = limit*page;
      const repairs = await Repair.findAndCountAll({limit, offset})
      return res.json(repairs)
    } catch(e) {
      next(ApiError.badRequest(e.message))
    }
    
  }

}

module.exports = new RepairController()