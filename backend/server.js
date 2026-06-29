const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// fake DB
let students = [
  { id: 1, name: "Mehika", dept: "CS" }
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ADD student
app.post("/students", (req, res) => {
  const newStudent = {
    id: Date.now(),
    name: req.body.name,
    dept: req.body.dept
  };

  students.push(newStudent);
  res.json(newStudent);
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});