const express = require("express");

const app = express();
app.use(express.json());

let students = [];
let nextId = 1;

app.post("/students", (req, res) => {
  const body = req.body || {};
  const { name, email, age } = body;

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof age !== "number" ||
    !Number.isInteger(age) ||
    age <= 0
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (students.some((student) => student.email.toLowerCase() === normalizedEmail)) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const student = {
    id: nextId++,
    name: name.trim(),
    email: email.trim(),
    age
  };

  students.push(student);
  return res.status(201).json(student);
});

app.get("/students", (req, res) => {
  let result = students;

  if (req.query.minAge !== undefined) {
    const rawMinAge = req.query.minAge;
    const minAge = Number(rawMinAge);

    if (rawMinAge.trim() === "" || !Number.isFinite(minAge)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    result = students.filter((student) => student.age >= minAge);
  }

  return res.status(200).json(result);
});

app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);

  if (!Number.isInteger(id) || id < 1 || !student) {
    return res.status(404).json({ error: "Student not found" });
  }

  return res.status(200).json(student);
});

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((item) => item.id === id);

  if (!Number.isInteger(id) || id < 1 || index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(index, 1);
  return res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Student API running at http://localhost:${PORT}`);
});
