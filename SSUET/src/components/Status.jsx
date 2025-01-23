import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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
  Snackbar,
  Alert,
} from "@mui/material";

const StatusTable = () => {
  const [status, setStatus] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pendingData, setPendingData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        const ngoDetails = Cookies.get("ngoDetails");
        const selectedBrand = Cookies.get("selectedBrand");

        if (!ngoDetails || !selectedBrand) return;

        const parsedNgoDetails = JSON.parse(ngoDetails);
        const parsedBrand = JSON.parse(selectedBrand);

        const ngoID = parsedNgoDetails?.[0]?.ngoID;
        const brandID = parsedBrand?.brandID;

        if (!ngoID || !brandID) return;

        const response = await axios.get(
          `http://localhost:2000/NGO/getPending/${ngoID}/${brandID}`
        );

        if (response.data.status === "success") {
          setPendingData(response.data.data);
        } else {
          setSnackbarMessage("Failed to fetch pending data.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error("Error fetching pending data:", error);
      }
    };

    fetchPendingData();
  }, []);

  const handleStatusChange = (event, row) => {
    setStatus({ ...status, [row.pendingID]: event.target.value });
    setSelectedRow(row);
  };

  const handleSubmit = (row) => {
    setOpenDialog(true);
    setSelectedRow(row);
  };

  const handleConfirmSubmit = async () => {
    setOpenDialog(false);
    if (selectedRow && status[selectedRow.pendingID] === "Completed") {
      try {
        await axios.post("http://localhost:2000/NGO/addDonation", {
          pendingID: selectedRow.pendingID,
        });

        // Update the status without removing the row from the table
        setPendingData((prevData) =>
          prevData.map((item) =>
            item.pendingID === selectedRow.pendingID
              ? { ...item, status: "Completed" }
              : item
          )
        );

        setSnackbarMessage("Donation successfully submitted.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error submitting donation:", error);
        setSnackbarMessage("Error submitting donation.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        padding: "20px", // Add some padding
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2b6777", marginBottom: "20px" }}>
        Cloth Status Table
      </h1>
      <TableContainer component={Paper} style={{ maxWidth: "90vw" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#2b6777" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>Name</TableCell>
              <TableCell style={{ color: "white" }}>Cloth Name</TableCell>
              <TableCell style={{ color: "white" }}>Age Group</TableCell>
              <TableCell style={{ color: "white" }}>Gender</TableCell>
              <TableCell style={{ color: "white" }}>Condition</TableCell>
              <TableCell style={{ color: "white" }}>Material</TableCell>
              <TableCell style={{ color: "white" }}>Status</TableCell>
              <TableCell style={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingData.map((row) => (
              <TableRow
                key={row.pendingID}
                style={{
                  backgroundColor:
                    row.status === "Completed" ? "#d4edda" : "white", // Highlight completed rows
                }}
              >
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.clothName}</TableCell>
                <TableCell>{row.ageGroup}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.conditions}</TableCell>
                <TableCell>{row.material}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status[row.pendingID] || row.status}
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
                    style={{
                      backgroundColor: "#2b6777",
                      color: "white",
                    }}
                    onClick={() => handleSubmit(row)}
                    disabled={status[row.pendingID] !== "Completed"}
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
            {status[selectedRow?.pendingID] || selectedRow?.status}" for{" "}
            {selectedRow?.userName}?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StatusTable;
