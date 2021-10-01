'use strict';

module.exports = app => {
  const { Model } = app.Sequelize;
  const <%= schemaName %>Schema = require('../schema/<%= fileName %>')(app);

  class <%= className %> extends Model {
    static async saveNew(params, { transaction }) {}

    static async getCount(params) {}

    static async getDetail(params, options, logging = false) {
      const res = await <%= className %>.findOne({
        where: {
          params,
        },
        ...options,
        logging,
      });

      return res;
    }
  }

  <%= className %>.init(<%= schemaName %>Schema, {
    sequelize: app.model,
    tableName: '<%= fileName %>',
    comment: '<%= comment %>',
  });

  return <%= className %>;
};
