import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { studentAPI } from "../services/api";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
const StudentList = () => {
  const [students, setStudents] = useState([]);
  // Fetch the list of students from the API
  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <div className="card-header py-3">
        <h2 className="m-0 font-weight-bold text-secondary">Students List</h2>
      </div>
      <Button color="secondary" startIcon={<NoteAddIcon />}>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/students/create"
        >
          Create Student
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
            <thead className="thead-dark">
              <tr>
                <th scope="col">RollNumber</th>
                <th scope="col">Name</th>
                <th scope="col">Class</th>
                <th scope="col">Edit </th>
                <th scope="col">Delete </th>
              </tr>
            </thead>
            <tbody>
              {students.map((data, i) => (
                <tr key={data._id}>
                  <td>{data.rollNumber}</td>
                  <td>{data.name}</td>
                  <td>{data.class}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="success"
                      startIcon={<EditNoteIcon />}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/students/update/${data._id}`}
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
                        to={`/students/delete/${data._id}`}
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

export default StudentList;
