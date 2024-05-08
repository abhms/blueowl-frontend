import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}`);
    setAllData(res.data.patients);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = allData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobileNo,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          onClick={() => navigate(`/view/${row.id}`)}
          className="text-white bg-teal-400 mx-auto hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:focus:ring-teal-900"
        >
          View
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Container style={{ width: "70%" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
          className="p-2 mb-4 w-full"
        />
        <DataTable columns={columns} data={searchTerm ? filteredData : allData} pagination />
      </Container>
    </React.Fragment>
  );
}

export default Dashboard;
