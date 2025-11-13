const validator = require('../helpers/validate');

const validate = {};

validate.checkCreateUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    username: 'required|string',
    email: 'required|email',
    birthday: 'required|string',
    password: 'required|string',
    membershipLevel: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
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