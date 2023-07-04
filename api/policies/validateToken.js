module.exports = (req, res, next) => {
  console.log(req.get("token"));
  if (req.get("token") === "auth") {
    return next();
  }
  res.status(403).json({
    status: false,
    message: "User is not authorized",
  });
};
