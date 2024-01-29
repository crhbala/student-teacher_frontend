import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { teacherAPI } from "../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UpdateTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({ name: "", subject: "" });

  useEffect(() => {
    // Fetch the existing teacher data based on the provided id
    teacherAPI.getAll().then((response) => {
      const existingTeacher = response.data.teachers.find(
        (teacher) => teacher._id === id
      );
      setTeacher(existingTeacher);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the teacher data
    teacherAPI.update(id, teacher).then(() => {
      navigate("/teachers");
    });
  };

  return (
    <div>
      <h2>Update Teacher</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter your full name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={teacher.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Subject:</Form.Label>
          <Form.Control
            type="text"
            name="class"
            value={teacher.subject}
            onChange={handleInputChange}
          />
        </Form.Group>
        <br />
        <Button variant="success" type="submit">
          Update Teacher
        </Button>
      </Form>
    </div>
  );
};

export default UpdateTeacher;
