const defaultModel = require('../../../models/project');
const validation = require('../../../utils/validation');
const response = require('../../../utils/response');
const uuid = require('../../../lib/uuid');
const filterObject = require('../../../utils/converter/filterObject');
const bcrypt = require('../../../lib/bcrypt');

const serviceName = 'project';

const useGet = async (req, res) => {
  try {
    const { keyword, page, size, order_by, order_name } = req.query;

    const offset = (Number(page || 1) - 1) * Number(size || 10);

    const { dataRows: data, meta } = await defaultModel.getData({
      keyword: !!keyword ? keyword : '',
      offset: !!page ? offset : 0,
      limit: size || 10,
      order_by: !!order_by ? order_by : 'DESC',
      order_name: !!order_name ? order_name : 'created_at',
    });

    const mapped = data.map((item) => {
      return {
        ...filterObject.filter(
          { ...item, },
          [],
        ),
      };
    });

    response.defaultResponse({
      res,
      status: 200,
      message: `Success get ${serviceName}`,
      data: mapped,
      meta: {
        ...meta,
        page: Number(page || 1),
        size: Number(size || 10),
      },
    });
  } catch (error) {
    response.responseErrorServer(res, error);
  }
}

const useCreate = async (req, res) => {
  const { body } = req;

  const validationKey = [
    'name:string'
  ];

  const validated = validation.postValidation(req, validationKey);

  if (validated) {
    return res.status(validated.status).json(validated);
  }

  try {
    const [checkName] = await defaultModel.getDataByName(body.name);

    if (checkName.length > 0) {
      response.defaultResponse({ res, status: 409, message: 'name already exists.' });
      return;
    }

    const payload = {
      ...body,
      id: uuid.generateId(),
      is_delete: 0,
    };

    await defaultModel.createData(payload);

    const payloadResponse = {
      ...filterObject.filter(payload, ['password', 'is_delete'])
    };

    response.defaultResponse({ res, status: 201, message: `Success create ${serviceName}`, data: payloadResponse });
  } catch (error) {
    response.responseErrorServer(res, error);
  }
}

module.exports = {
  useGet,
  useCreate
}