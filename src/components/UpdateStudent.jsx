import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { studentAPI } from "../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    class: "",
    rollNumber: "",
  });
  console.log(student);

  useEffect(() => {
    // Fetch the existing student data based on the provided id
    studentAPI.getAll().then((response) => {
      const existingStudent = response.data.students.find(
        (student) => student._id === id
      );
      setStudent(existingStudent);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the student data
    studentAPI.update(id, student).then(() => {
      navigate("/students");
    });
  };

  return (
    <div>
      <h2>Update Student</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter your full name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={student.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Class:</Form.Label>
          <Form.Control
            type="text"
            name="class"
            value={student.class}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Roll Number:</Form.Label>
          <Form.Control
            type="text"
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <br />
        <Button variant="success" type="submit">
          Update Student
        </Button>
      </Form>
    </div>
  );
};

export default UpdateStudent;
