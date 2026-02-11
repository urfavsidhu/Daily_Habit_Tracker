import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 5000;
const FILE = "./habits.json";

app.use(cors());
app.use(express.json());

// ✅ Ensure file exists
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]");
}

// ✅ GET habits
app.get("/api/habits", (req, res) => {
  try {
    const data = fs.readFileSync(FILE);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// ✅ SAVE habits
app.post("/api/habits", (req, res) => {
  try {
    fs.writeFileSync(FILE, JSON.stringify(req.body, null, 2));
    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
