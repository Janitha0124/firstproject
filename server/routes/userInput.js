const express = require("express");
const router = express.Router();
const UserInput = require("../models/userInput");

// Get all texts
router.get("/", async (req, res) => {
  try {
    const texts = await UserInput.findAll();
    res.json(texts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create text
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required" });

    const newText = await UserInput.create({ content });
    res.status(201).json(newText);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete text
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UserInput.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
