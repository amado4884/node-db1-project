const router = require("express").Router();
const db = require("../data/dbConfig.js");

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    return res.status(200).json(accounts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) return res.status(400).json({ message: "Invalid id" });

  try {
    const account = await db("accounts").where({ id });
    if (account.length === 0)
      return res.status(400).json({ message: "No account with that ID" });

    return res.status(200).json(account[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
});

router.post("/", async (req, res) => {
  const { name, budget } = req.body;

  if (!req.body || !name || !budget)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const newAccountId = await db("accounts").insert({ name, budget });
    const newAccount = await db("accounts").where({ id: newAccountId[0] });
    return res.status(200).json(newAccount[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, budget } = req.body;

  if (!id || isNaN(id)) return res.status(400).json({ message: "Invalid id" });
  if (!req.body || !name || !budget)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const success = await db("accounts").where({ id }).update({ name, budget });
    if (success !== 1)
      return res.status(400).json({ message: "Could not update record" });

    const account = await db("accounts").where({ id });
    return res.status(200).json(account[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) return res.status(400).json({ message: "Invalid id" });

  try {
    const recordsDeleted = await db("accounts").where({ id }).del();
    if (!recordsDeleted)
      return res.status(400).json({ message: "Could not delete record" });

    return res
      .status(200)
      .json({ message: `Successfully deleted the account with the id: ${id}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err });
  }
});

module.exports = router;
