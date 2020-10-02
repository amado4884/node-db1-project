const router = require("express").Router();
const db = require("../data/dbConfig.js");

router.get("/", async (req, res) => {
  const { limit, sortby, sortdir } = req.query;
  try {
    const accounts = await db("customers")
      .select("*")
      .orderBy(sortby ? sortby : "company_name", sortdir ? sortdir : "ASC")
      .limit(limit ? limit : null);
    return res.status(200).json(accounts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
});

module.exports = router;
