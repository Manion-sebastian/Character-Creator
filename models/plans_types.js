'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plans_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  plans_types.init({
    typeId: DataTypes.INTEGER,
    planId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'plans_types',
  });
  return plans_types;
};