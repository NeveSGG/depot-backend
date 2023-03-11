const {Worker} = require('../models/model')
const ApiError = require('../error/ApiError')

class WorkerController {

  async addWorker (req, res, next) {
    try {
      const {fioWorker, baseWorker, specialtyWorker, yearWorker, adressExternal, ChiefChiefKey} = req.body
      const worker = await Worker.create({
        fioWorker, baseWorker, specialtyWorker, yearWorker, adressExternal, ChiefChiefKey
      })
      return res.json(worker)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getWorker (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const worker = await Worker.findOne({
        where: {workerKey: id}
      })
      return res.json(worker)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async removeWorker (req, res, next) {
    try {
      const {id} = req.query
      if (!id) {
        return next(ApiError.badRequest('Не задан ID'))
      }
      const worker = await Worker.findOne({
        where: {workerKey: id}
      })
      if (!worker) {depot
        return next(ApiError.badRequest('Запись не найдена'))
      } else {
        await worker.destroy()
      }
      return res.json({message: 'Запись удалена'})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAllWorkers (req, res, next) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 10
      const offset = limit*page;
      const workers = await Worker.findAndCountAll({limit, offset})
      return res.json(workers)
    } catch(e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new WorkerController()