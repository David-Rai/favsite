const { validationResult } = require("express-validator");
const db = require("../models/db.js");

//sending all the sites
const getAll = async (req, res) => {
  const { user_id } = req.user;
  const query =
    "select sites.* from users join sites on users.user_id=sites.user_id where users.user_id = ?";
  const [rows] = await db.execute(query, [user_id]);

  if (rows.lenght === 0) {
    return res.status(500).json({ message: "no rows available" });
  }

  res.json(rows);
};

//adding the new site
const addSite = async (req, res, next) => {
  const newSite = req.body;
  const user_id = req.user.user_id;

  const siteImage = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${newSite.site_path}&size=34`;

  //express validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("data is not inserted");
    error.status = 500;
    return next(error);
  }

  const query =
    "insert into sites (site_path,img_path,name,user_id) values(?,?,?,?)";
  const results = await db.execute(query, [
    newSite.site_path,
    siteImage,
    newSite.name,
    user_id,
  ]);

  //error handling
  if (results[0].affectedRows == 0) {
    const error = new Error("data is not inserted");
    error.status = 500;
    return next(error);
  }

  res.json(results);
};

//deleting the site on basis of the id
const deleteSite = async (req, res, next) => {
  //express validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("data is not inserted");
    error.status = 500;
    return next(error);
  }

  const id = req.body.id;
  const user_id = req.user.user_id;
  const query = `
  DELETE FROM sites WHERE id = ? and user_id =?;
`;

  const results = await db.execute(query, [id, user_id]);

  //error handling
  if (results[0].affectedRows == 0) {
    const error = new Error("data is not inserted");
    error.status = 500;
    return next(error);
  }

  res.json(results);
};

//update data on basis of their id
const updateSite = async (req, res, next) => {
  //express validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("data is not inserted");
    error.status = 500;
    return next(error);
  }

  const { id, site_path, name } = req.body;
  const user_id = req.user.user_id;
  const siteImage = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${site_path}&size=34`;

  const query = "update sites set site_path=?,img_path=? ,name=? where id=? and user_id=?";
  const results = await db.execute(query, [site_path, siteImage, name, id,user_id]);

  //error handling
  if (results[0].affectedRows == 0) {
    const error = new Error("data is not inserted");
    error.status = 500;
    return next(error);
  }

  res.send({ id, site_path, results });
};

module.exports = {
  getAll,
  addSite,
  deleteSite,
  updateSite,
};
