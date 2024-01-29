import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { teacherAPI } from "../services/api";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch the list of teachers from the API
    const fetchTeachers = async () => {
      try {
        const response = await teacherAPI.getAll();
        setTeachers(response.data.teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <div className="card-header py-3">
        <h2 className="m-0 font-weight-bold text-secondary">Teachers List</h2>
      </div>
      <Button color="secondary" startIcon={<NoteAddIcon />}>
        {" "}
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/teachers/create"
        >
          Create Teacher
        </Link>
      </Button>

      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-dark"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((data, i) => (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.subject}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<EditNoteIcon />}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/teachers/update/${data._id}`}
                      >
                        Edit
                      </Link>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/teachers/delete/${data._id}`}
                      >
                        Delete
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
