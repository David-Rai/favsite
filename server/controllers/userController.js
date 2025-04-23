const { validationResult } = require("express-validator");
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register route

const register = async (req, res, next) => {
  //register validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("fileds are required");
    error.status = 500;
    return next(error);
    };


  const { name, email, password } = req.body;

  //checking if email exist or not
  const [rows] = await db.execute("select * from users where email=?", [email]);
  if (rows.length > 0) {
    const error = new Error("user existed");
    error.status = 500;
    return next(error);
  }

  //encrypting the password
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      const error = new Error("inserting failed");
      error.status = 500;
      return next(error);
    }

    const query = "insert into users (name,email,password) values (?,?,?)";
    const results = await db.execute(query, [name, email, hash]);

    if (!results[0].affectedRows > 0) {
      const error = new Error("inserting failed");
      error.status = 500;
      return next(error);
    }
    const secretKey = process.env.SECRET;
    const payload = {
      email,
      user_id: results[0].insertId,
    };
    const token = jwt.sign(payload, secretKey);
    res.cookie("token", token, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      // secure:false
    });
    res.json({
      status: 201,
      message: "successfully registered",
    });
  });

};

//LOGIN
const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("fileds are required");
    error.status = 500;
    return next(error);
    };

  const { email, password } = req.body;
  const query = "select * from users where email=?";
  const [rows] = await db.execute(query, [email]);

  // creating the jwt if valid
  bcrypt.compare(password, rows[0].password, (err, result) => {
    if (err || !result) {
      const error = new Error("password is incorrect");
      error.status = 401;
      return next(error);
    }
    if (result) {
      const payload = {
        email,
        user_id: rows[0].user_id,
      };
      const secretKey = process.env.SECRET;
      const token = jwt.sign(payload, secretKey);


      res.cookie("token", token, {
        path: "/",
        sameSite: "lax",
        httpOnly: true,
        // secure:false
      });

      res.json({
        success: true,
        message: "login successfully",
      });
    }
  });
};

//verification
const verify = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ auth: false });
  }

  const secretKey = process.env.SECRET;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      const error = new Error("jwt not valid");
      error.status = 500;
      return next(error);
    }

    return res.json({ auth: true, user: decoded });
  });
};

//loging out
const logout=(req,res)=>{

  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  res.status(200).json({success:true,message:"logout"})
}
module.exports = {
  register,
  login,
  verify,
  logout
};
