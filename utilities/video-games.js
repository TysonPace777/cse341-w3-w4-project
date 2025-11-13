const validator = require('../helpers/validate');

const validate = {};

validate.checkCreateGame = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    price: 'required|string',
    description: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


module.exports = validate;