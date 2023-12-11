export function validateSchema(schema) {
  return (req, res, next) => {
    const validate = schema.validate(req.body, { abortEarly: false });

    if (validate.error) {
      const errors = throwError(validate.error);
      return res.status(422).send(errors);
    }

    next();
  };
}

function throwError(error) {
  const errorMessage = error.details.map(d => d.message).join(', ');
  return errorMessage;
}
