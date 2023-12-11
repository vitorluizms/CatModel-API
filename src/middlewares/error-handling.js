export default function errorHandlingMiddleware(
  error,
  req,
  res,
  next, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (error.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send(error.message);
  }

  if (error.name === 'ConflictError') {
    return res.status(httpStatus.CONFLICT).send(error.message);
  }

  if (error.name === 'InvalidData') {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR);
}
