import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teacherAPI } from "../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateTeacher = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newTeacher = { name, subject };
      await teacherAPI.create(newTeacher);
      navigate("/teachers");
    } catch (error) {
      console.error("Error creating teacher:", error);
      // Handle error as needed
    }
  };

  return (
    <div
      style={{
        display: "block",
        width: "auto",
        padding: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Create Teacher</h2>
      <Form>
        <Form.Group>
          <Form.Label>Enter your full name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Class:</Form.Label>
          <Form.Control
            placeholder="Enter your Class"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="success" type="submit" onClick={handleCreate}>
          Create Student
        </Button>
      </Form>
    </div>
  );
};

export default CreateTeacher;
