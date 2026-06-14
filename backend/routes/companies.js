const express = require("express");
const router = express.Router();

const db = require("../config/db");

/* GET ALL COMPANIES */

router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM companies",
    (err, result) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Server error"
        });
      }

      res.json(result);

    }
  );

});

/* ADD COMPANY */

router.post("/", (req, res) => {

  const { name, type } = req.body;

  db.query(
    "INSERT INTO companies (name, type) VALUES (?, ?)",
    [name, type],
    (err) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Server error"
        });
      }

      res.json({
        message: "Company added"
      });

    }
  );

});

/* DELETE COMPANY */

router.delete("/:id", (req, res) => {

  db.query(
    "DELETE FROM companies WHERE id = ?",
    [req.params.id],
    (err) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Server error"
        });
      }

      res.json({
        message: "Company deleted"
      });

    }
  );

});

module.exports = router;