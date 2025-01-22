import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const StatusTable = () => {
  const [status, setStatus] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      clothName: "T-Shirt",
      ageGroup: "Adult",
      gender: "Male",
      condition: "New",
      material: "Cotton",
      mode: "Delivery",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      clothName: "Jeans",
      ageGroup: "Teen",
      gender: "Female",
      condition: "Used",
      material: "Denim",
      mode: "Pickup",
      status: "Pending",
    },
  ];

  const handleStatusChange = (event, row) => {
    setStatus({ ...status, [row.id]: event.target.value });
    setSelectedRow(row);
  };

  const handleSubmit = (row) => {
    setOpenDialog(true);
    setSelectedRow(row);
  };

  const handleCloseDialog = (confirmed) => {
    setOpenDialog(false);
    if (confirmed && selectedRow) {
      console.log(`Status for ${selectedRow.name} confirmed as ${status[selectedRow.id] || selectedRow.status}!`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center",     // Center vertically
        height: "100vh",          // Full screen height
        flexDirection: "column",
        marginRight:"20vw"  // Stack items vertically (heading and table)
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2b6777", marginBottom: "20px" }}>Cloth Status Table</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#2b6777" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>Name</TableCell>
              <TableCell style={{ color: "white" }}>Cloth Name</TableCell>
              <TableCell style={{ color: "white" }}>Age Group</TableCell>
              <TableCell style={{ color: "white" }}>Gender</TableCell>
              <TableCell style={{ color: "white" }}>Condition</TableCell>
              <TableCell style={{ color: "white" }}>Material</TableCell>
              <TableCell style={{ color: "white" }}>Mode</TableCell>
              <TableCell style={{ color: "white" }}>Status</TableCell>
              <TableCell style={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.clothName}</TableCell>
                <TableCell>{row.ageGroup}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.condition}</TableCell>
                <TableCell>{row.material}</TableCell>
                <TableCell>{row.mode}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status[row.id] || row.status}
                      onChange={(e) => handleStatusChange(e, row)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#2b6777", color: "white" }}
                    onClick={() => handleSubmit(row)}
                  >
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Status</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to set the status to "
            {status[selectedRow?.id] || selectedRow?.status}" for{" "}
            {selectedRow?.name}?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleCloseDialog(true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusTable;
