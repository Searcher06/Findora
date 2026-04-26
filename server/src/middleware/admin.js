export const adminOnlyMiddleware = (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  if (!["admin", "moderator"].includes(req.user.role)) {
    res.status(403);
    throw new Error("Forbidden, admin access required");
  }

  next();
};

export default adminOnlyMiddleware;
