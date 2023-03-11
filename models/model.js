const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Depot = sequelize.define('Depot', {
  depotKey: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  isExternal: {type: DataTypes.BOOLEAN, allowNull: false},
  bankExternal: {type: DataTypes.CHAR(50), allowNull: false},
  innExternal: {type: DataTypes.INTEGER, allowNull: false, unique: true},
  adressExternal: {type: DataTypes.CHAR(50), allowNull: false}
})

const Chief = sequelize.define('Chief', {
  chiefKey: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  fioChief: {type: DataTypes.CHAR(100), allowNull: false},
  base: {type: DataTypes.CHAR(50), allowNull: false},
})

const Locomotive = sequelize.define('Locomotive', {
  locomotiveKey: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  regNumber: {type: DataTypes.INTEGER, allowNull: false, unique: true},
  kindValue: {type: DataTypes.CHAR(30), allowNull: false},
  typeValue: {type: DataTypes.CHAR(50), allowNull: false},
  typeYear: {type: DataTypes.INTEGER, allowNull: false},
  picture: {type: DataTypes.BOOLEAN, allowNull: false},
  regName: {type: DataTypes.CHAR(30), allowNull: false}
})

const Worker = sequelize.define('Worker', {
  workerKey: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  fioWorker: {type: DataTypes.CHAR(100), allowNull: false},
  baseWorker: {type: DataTypes.CHAR(50), allowNull: false},
  specialtyWorker: {type: DataTypes.CHAR(50), allowNull: false},
  yearWorker: {type: DataTypes.INTEGER, allowNull: false}
})

const Bonus = sequelize.define('Bonus', {
  bonusKey: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  bonusWorker: {type: DataTypes.INTEGER, allowNull: false},
  comment: {type: DataTypes.CHAR(100), allowNull: true},
  bonusType: {type: DataTypes.CHAR(30), allowNull: false},
})

const Repair = sequelize.define('Repair', {
  repairKey: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
  dateStart: {type: DataTypes.DATEONLY, allowNull: false},
  dateStop: {type: DataTypes.DATEONLY, allowNull: false},
  reasonValue: {type: DataTypes.CHAR(100), allowNull: false},
  typeRepair: {type: DataTypes.CHAR(50), allowNull: false},
  bonus: {type: DataTypes.BOOLEAN, allowNull: false},
  money: {type: DataTypes.FLOAT, allowNull: false},
  bonusPercent: {type: DataTypes.INTEGER, allowNull: false}
})

Depot.hasMany(Locomotive, {onDelete: 'cascade'})
Locomotive.belongsTo(Depot, {onDelete: 'cascade'})

Chief.hasMany(Worker, { onDelete: 'cascade' })
Worker.belongsTo(Chief, {onDelete: 'cascade'})

Worker.hasMany(Bonus, { onDelete: 'cascade' })
Bonus.belongsTo(Worker, {onDelete: 'cascade'})

Chief.hasMany(Repair, { onDelete: 'cascade' })
Repair.belongsTo(Chief, {onDelete: 'cascade'})

Locomotive.hasMany(Repair, { onDelete: 'cascade' })
Repair.belongsTo(Locomotive, {onDelete: 'cascade'})

module.exports = {
  Depot,
  Chief,
  Worker,
  Locomotive,
  Bonus,
  Repair
}