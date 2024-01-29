import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { studentAPI } from "../services/api";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch the student details based on ID
    studentAPI.getAll().then((response) => {
      const foundStudent = response.data.students.find(
        (student) => student._id === id
      );
      setStudent(foundStudent);
    });
  }, [id]);

  const handleDelete = () => {
    // Perform the deletion and then redirect to the student list
    studentAPI.delete(id).then(() => {
      navigate("/students");
    });
  };

  return (
    <div>
      <div className="card-header py-3">
        <h2 className="m-0 font-weight-bold text-secondary">Delete Student</h2>
      </div>
      {student && (
        <div>
          <p>
            Are you sure you want to delete {student.name} (Roll Number:{" "}
            {student.rollNumber})?
          </p>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Yes, Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeleteStudent;
