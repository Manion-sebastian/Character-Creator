'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.plan.belongsTo(models.user)
      models.plan.belongsToMany(models.type, {through: 'models.plans_types'})
    }
  }
  plan.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    icon_image: DataTypes.STRING,
    banner_image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'plan',
  });
  return plan;
};