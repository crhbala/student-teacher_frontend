import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { teacherAPI } from "../services/api";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    // Fetch the teacher details based on ID
    teacherAPI.getAll().then((response) => {
      const foundTeacher = response.data.teachers.find(
        (teacher) => teacher._id === id
      );
      setTeacher(foundTeacher);
    });
  }, [id]);

  const handleDelete = () => {
    // Perform the deletion and then redirect to the teacher list
    teacherAPI.delete(id).then(() => {
      navigate("/teachers");
    });
  };

  return (
    <div>
      <div className="card-header py-3">
        <h2 className="m-0 font-weight-bold text-secondary">Delete Teacher</h2>
      </div>

      {teacher && (
        <div>
          <p className=" font-weight-bold">
            Are you sure you want to delete {teacher.name} (Subject:{" "}
            {teacher.subject})?
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

export default DeleteTeacher;
