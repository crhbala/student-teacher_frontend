import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentAPI } from "../services/api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateStudent = () => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newStudent = { name, class: className, rollNumber, };
      await studentAPI.create(newStudent);
      navigate("/students");
    } catch (error) {
      console.error("Error creating student:", error);
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
      <h2>Create Student</h2>
      <Form onSubmit={handleCreate}>
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
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Roll Number:</Form.Label>
          <Form.Control
            placeholder="Enter your Roll Number"
            type="number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="success" type="submit">
          Create Student
        </Button>
      </Form>
    </div>
  );
};

export default CreateStudent;
