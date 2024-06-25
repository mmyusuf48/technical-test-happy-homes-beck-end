const dbPool = require('../../config/database');
const sqlString = require('../../utils/converter/sqlString');

const tableName = 'user_rates';
const primaryKey = 'id';
const fields = [
  'id',
  'name',
  'rate'
];

const getData = async ({ keyword, offset, limit, order_by, order_name }) => {
  const includeFields = [
    'created_at',
    'updated_at',
  ];

  const excludeFields = ['is_delete'];

  const selectFields = sqlString.convertSelectField({ fields, includeFields, excludeFields });

  const SQLQuery = `
    SELECT
      *
    FROM
      ${tableName}
  `;

  const countQuery = `
    SELECT COUNT(*) AS total FROM ${tableName} WHERE is_delete = 0 ORDER BY name ASC;
  `;

  const searchKeyword = `%${keyword}%`;

  const [dataResults, countResult] = await Promise.all([
    dbPool.execute(SQLQuery, [searchKeyword, searchKeyword, limit, offset]),
    dbPool.execute(countQuery, [searchKeyword, searchKeyword]),
  ]);

  const [dataRows] = dataResults;
  const [{ total }] = countResult[0];

  return {
    dataRows,
    meta: {
      total,
    },
  };
};

const createData = (body) => {
  const includeFields = ['is_delete'];

  const createFields = sqlString.convertCreateField({ fields, includeFields });
  const values = sqlString.convertCreateFieldValue({ fields, includeFields, body });

  const SQLQuery = `INSERT INTO ${tableName} ${createFields} VALUES ${values}`;

  return dbPool.execute(SQLQuery);
}

const getDataByName = (name) => {
  const SQLQuery = `SELECT * FROM ${tableName} WHERE is_delete = 0 AND name = ? ORDER BY name ASC`;

  return dbPool.execute(SQLQuery, [name]);
}

module.exports = {
  getData,
  createData,
  getDataByName
}