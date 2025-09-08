export const errorMiddleware = (err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || "something went wrong";
};
