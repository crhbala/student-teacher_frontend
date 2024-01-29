// /src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentList from "./components/StudentList";
import TeacherList from "./components/TeacherList";
import CreateStudent from "./components/CreateStudent";
import CreateTeacher from "./components/CreateTeacher";
import UpdateStudent from "./components/UpdateStudent";
import UpdateTeacher from "./components/UpdateTeacher";
import DeleteStudent from "./components/DeleteStudent";
import DeleteTeacher from "./components/DeleteTeacher";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/students/create" element={<CreateStudent />} />
        <Route path="/teachers/create" element={<CreateTeacher />} />
        <Route path="/students/update/:id" element={<UpdateStudent />} />
        <Route path="/teachers/update/:id" element={<UpdateTeacher />} />
        <Route path="/students/delete/:id" element={<DeleteStudent />} />
        <Route path="/teachers/delete/:id" element={<DeleteTeacher />} />
      </Routes>
    </Router>
  );
}

export default App;
