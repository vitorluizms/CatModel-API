export function notFoundError(message) {
  return {
    name: 'NotFoundError',
    message,
  };
}
