export const errorMiddleware = (err, req, res, next) => {
  // Login the error to the console
  console.log(`\nError from ${req.method} ${req.url}\nHere is the error:`, err);

  // setting the statusCode
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // customizing the error message
  const message = err.message || "something went wrong";

  // sending the response
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV == "production" ? null : err.stack,
  });
};
