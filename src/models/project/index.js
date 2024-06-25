const dbPool = require('../../config/database');
const sqlString = require('../../utils/converter/sqlString');

const tableName = 'project';
const primaryKey = 'id';
const fields = [
  'id',
  'name'
];

const getData = async () => {
  const SQLQuery = `
    SELECT
      *
    FROM
      ${tableName}
  `;

  const countQuery = `
    SELECT COUNT(*) AS total FROM ${tableName} WHERE is_delete = 0 ;
  `;

  const [dataResults, countResult] = await Promise.all([
    dbPool.execute(SQLQuery, []),
    dbPool.execute(countQuery, []),
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
  const SQLQuery = `SELECT * FROM ${tableName} WHERE is_delete = 0 AND name = ? `;

  return dbPool.execute(SQLQuery, [name]);
}

module.exports = {
  getData,
  createData,
  getDataByName
}