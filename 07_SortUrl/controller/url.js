const shortid = require("shortid");
const URL = require("../models/url");

async function handelGenerateSortUrl(req, res) {
  const shortID = shortid();
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortID });
}

async function handleRedirectUrl(req, res) {
  const shortId = req.params.sortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timeStamps: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.status(201).json({
    totalClicks: result.visitHistory.length,
    Analytics: result.visitHistory,
  });
}

module.exports = {
  handelGenerateSortUrl,
  handleRedirectUrl,
  handleGetAnalytics,
};
