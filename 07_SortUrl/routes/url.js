const express = require("express");
const {
  handelGenerateSortUrl,
  handleRedirectUrl,
  handleGetAnalytics,
} = require("../controller/url");

const router = express.Router();

router.post("/", handelGenerateSortUrl);
router.get("/:sortId", handleRedirectUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
