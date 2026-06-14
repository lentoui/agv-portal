const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
    AND password = ?
    LIMIT 1
  `;

  db.query(sql, [email, password], (err, result) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Server error"
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const user = result[0];

    res.json({
      id: user.id,
      company_id: user.company_id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });

  });
});

module.exports = router;