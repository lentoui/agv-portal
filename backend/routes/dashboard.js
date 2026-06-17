const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

  const resultData = {};

  /* TOTAL USERS */

  db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, usersResult) => {

    if (err) return res.status(500).json(err);

    resultData.totalUsers = usersResult[0].totalUsers;

    /* TOTAL COMPANIES */

    db.query("SELECT COUNT(*) AS totalCompanies FROM companies", (err, companyResult) => {

      if (err) return res.status(500).json(err);

      resultData.totalCompanies = companyResult[0].totalCompanies;

      res.json(resultData);

    });

  });

});

module.exports = router;
