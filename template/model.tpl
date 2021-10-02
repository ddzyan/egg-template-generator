'use strict';

module.exports = app => {
  const { Sequelize, execSql, checkUpdate, checkDelete } = app;
  const { Op } = Sequelize;

  const { Model } = app.Sequelize;
  const <%= schemaName %>Schema = require('../schema/<%= fileName %>')(app);

  class <%= className %> extends Model {
    static async saveNew(param, options) {
      const res = await execSql(this.create(param, { ...options }));
      return res;
    }

    static async saveBulk(paramList, options) {
      if (!Array.isArray(paramList)) {
        throw new TypeError('参数类型错误，必须为数组');
      }
      const res = await execSql(this.bulkCreate(paramList, {
        ...options,
      }));

      return res;
    }

    static async getCount(param) {
      const count = await execSql(this.count({
        where: param,
      }));

      return count;
    }

    static async saveModify(newParam, param, options) {
      const result = await execSql(this.update(newParam, {
        where: param,
        ...options,
      }));
      checkUpdate(result);
      return result;
    }

    static async remove(param, options) {
      const result = await execSql(this.destroy({ where: param, ...options }));

      checkDelete(result);

      return result;
    }

    static async getDetail(param, options) {
      const res = await execSql(this.findOne({
        where: param,
        ...options,
      }));

      return res;
    }

    static async getAll(param, options) {
      const res = await execSql(
        this.findAll({
          where: param,
          ...options,
        })
      );

      return res;
    }
  }

  <%= className %>.associate = function() {
   
  };

  <%= className %>.init(<%= schemaName %>Schema, {
    sequelize: app.model,
    tableName: '<%= fileName %>',
    comment: '<%= comment %>',
  });

  return  <%= className %>;
};
