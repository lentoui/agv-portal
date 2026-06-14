const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const waterLevel = (Math.random() * 5).toFixed(2);

  let status = "Safe";

  if (waterLevel >= 4) {
    status = "Danger";
  } else if (waterLevel >= 2) {
    status = "Warning";
  }

  res.json({
    location: "River A",
    waterLevel,
    rainfall: (Math.random() * 100).toFixed(2),
    status
  });
});

module.exports = router;
