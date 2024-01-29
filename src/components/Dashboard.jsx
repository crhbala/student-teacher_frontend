import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { studentAPI, teacherAPI } from "../services/api";
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function Dashboard() {
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
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "name", label: "Students Name", minWidth: 170 },
    { id: "rollNumber", label: "Roll Number", minWidth: 100 },
    {
      id: "class",
      label: "Class",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },

  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="bg-white p-2">
      <div className=" list-group-flush container-fluid d-flex justify-content-evenly">
        <div>
          <Link to={"/students"} className="btn">
            <i className="bi bi-person-workspace"></i>
            <a className="list-group-item list-group-item-action py-2">
              <span>Students</span>
            </a>
          </Link>
        </div>
        <div>
          <Link to={"/teachers"} className="btn">
            <i className="bi bi-person-video3"></i>
            <a className="list-group-item list-group-item-action py-2">
              <span>Teachers</span>
            </a>
          </Link>
        </div>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Teachers Name</StyledTableCell>
              <StyledTableCell align="right">Subject</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.subject}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Dashboard