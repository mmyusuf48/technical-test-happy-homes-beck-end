const dbPool = require('../../config/database');
const sqlString = require('../../utils/converter/sqlString');

const tableName = 'kegiatan';
const primaryKey = 'id';
const fields = [
  'id',
  'start_date',
  'end_date',
  'start_time',
  'end_time',
  'activity',
  'project_id',
  'user_rate_id'
];

const getData = async ({ keyword, user_rate_id }) => {

  const SQLQuery = `
  SELECT
    kegiatan.*, 
    project.name AS project_name, 
    user_rates.rate AS user_rate
  FROM
    ${tableName} AS kegiatan
  INNER JOIN
    project ON kegiatan.project_id = project.id
  INNER JOIN
    user_rates ON kegiatan.user_rate_id = user_rates.id
  WHERE
    kegiatan.is_delete = 0
    AND kegiatan.user_rate_id = ?
`;



  const countQuery = `
  SELECT COUNT(*) AS total
  FROM
    ${tableName} AS kegiatan
  INNER JOIN
    project ON kegiatan.project_id = project.id
  INNER JOIN
    user_rates ON kegiatan.user_rate_id = user_rates.id
  WHERE
    kegiatan.is_delete = 0
    AND kegiatan.user_rate_id = ?
`;

  // const searchKeyword = `%${keyword}%`;

  const [dataResults, countResult] = await Promise.all([
    dbPool.execute(SQLQuery, [user_rate_id]),
    dbPool.execute(countQuery, [user_rate_id]),
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

const deleteData = (id) => {
  const SQLQuery = `UPDATE ${tableName} SET is_delete='1' WHERE ${primaryKey}='${id}'`;

  return dbPool.execute(SQLQuery);
}

const getDataByName = (name) => {
  const SQLQuery = `SELECT * FROM ${tableName} WHERE is_delete = 0 AND name = ? `;

  return dbPool.execute(SQLQuery, [name]);
}

module.exports = {
  getData,
  createData,
  getDataByName,
  deleteData
}