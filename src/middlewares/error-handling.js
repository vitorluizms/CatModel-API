export default function errorHandlingMiddleware(
  error,
  req,
  res,
  next, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (error.name === 'NotFoundError') {
    return res.status(404).send(error.message);
  }

  if (error.name === 'ConflictError') {
    return res.status(409).send(error.message);
  }

  if (error.name === 'InvalidData') {
    return res.status(400).send(error.message);
  }

  return res.status(500).send(error.message);
}
