import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");

  // GET students from backend
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  // ADD student
  const addStudent = () => {
    if (!name || !dept) return;

    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, dept })
    })
      .then(res => res.json())
      .then(newStudent => {
        setStudents([...students, newStudent]);
        setName("");
        setDept("");
      });
  };

  // DELETE student
  const deleteStudent = (id) => {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE"
    }).then(() => {
      setStudents(students.filter(s => s.id !== id));
    });
  };

  return (
    <div className="container">

      <h1>Student Management</h1>

      {/* FORM */}
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Department"
        value={dept}
        onChange={(e) => setDept(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      {/* LIST */}
      <div className="list">
        {students.map((s) => (
          <div className="card" key={s.id}>
            <p>{s.name} - {s.dept}</p>
            <button onClick={() => deleteStudent(s.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;