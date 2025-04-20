const { validationResult } = require("express-validator");
const db = require("../models/db");

//register route
const register = async (req, res, next) => {
  //register validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("fields are required failed");
    error.status = 500;
    return next(error);
  }

  const { name, email, password } = req.body;
  const query = "insert into users (name,email,password) values (?,?,?)";
  const results = await db.execute(query, [name, email, password]);

  if (!results[0].affectedRows > 0) {
    const error = new Error("inserting failed");
    error.status = 500;
    return next(error);
  }

  res.json({
    status: 200,
    message: "successfully registered",
  });
};

module.exports = {
  register,
};
