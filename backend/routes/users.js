const express = require("express");
const router = express.Router();

const db = require("../config/db");

/* GET USERS WITH COMPANY */

router.get("/", (req, res) => {

  const {
    role,
    company_id
  } = req.query;

  let sql = `
    SELECT
      users.*,
      companies.name AS company_name
    FROM users
    LEFT JOIN companies
    ON users.company_id = companies.id
  `;

  let params = [];

  /* CLIENT USERS:
     only see their own company */

  if (
    role === "client_admin" ||
    role === "client_staff"
  ) {

    sql += `
      WHERE users.company_id = ?
    `;

    params.push(company_id);

  }

  db.query(sql, params, (err, result) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Server error"
      });
    }

    res.json(result);

  });

});

/* ADD USER */

router.post("/", (req, res) => {

  const {
    company_id,
    name,
    email,
    password,
    role
  } = req.body;

  const sql = `
    INSERT INTO users
    (
      company_id,
      name,
      email,
      password,
      role,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      company_id,
      name,
      email,
      password,
      role,
      "active"
    ],
    (err) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Server error"
        });
      }

      res.json({
        message: "User added"
      });

    }
  );

});

/* DELETE USER */

router.delete("/:id", (req, res) => {

  db.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    (err) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Server error"
        });
      }

      res.json({
        message: "User deleted"
      });

    }
  );

});

module.exports = router;