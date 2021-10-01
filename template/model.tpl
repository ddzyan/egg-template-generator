'use strict';

module.exports = app => {
  const { Sequelize, checkUpdate, checkDelete } = app;
  const { Op } = Sequelize;

  const { Model } = app.Sequelize;
  const <%= schemaName %>Schema = require('../schema/<%= fileName %>')(app);

  class <%= className %> extends Model {
    static async saveNew(param, options) {
      const res = await <%= className %>.create(param, { ...options });
      return res;
    }

    static async getCount(param) {
      const count = await <%= className %>.count({
        where: param,
      });

      return count;
    }

    static async saveModify(newParam, param, options) {
      const result = await <%= className %>.update(newParam, {
        where: param,
        ...options,
      });
      checkUpdate(result);
      return result;
    }

    static async remove(param, options) {
      const result = await <%= className %>.destroy({ where: param, ...options });

      checkDelete(result);

      return uuid;
    }

    static async getDetail(param, options) {
      const res = await <%= className %>.findOne({
        where: param,
        ...options,
      });

      return res;
    }
  }

  <%= className %>.init(<%= schemaName %>Schema, {
    sequelize: app.model,
    tableName: '<%= fileName %>',
    comment: '<%= comment %>',
  });

  return  <%= className %>;
};
