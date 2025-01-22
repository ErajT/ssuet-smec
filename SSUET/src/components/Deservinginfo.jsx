import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
    },
    background: {
      default: "#e0e0e0",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

function ExcelToMuiTable() {
  const [rows, setRows] = useState({ header: [], body: [] });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", gender: "", ageGroup: "", phoneNo: "" });
  const [savedDeserving, setSavedDeserving] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const ngoDetails = Cookies.get("ngoDetails");
  let ngoID = null;

  if (ngoDetails) {
    try {
      const parsedNgoDetails = JSON.parse(ngoDetails);
      ngoID = parsedNgoDetails[0]?.ngoID || null;
    } catch (error) {
      console.error("Error parsing NGO details from cookies:", error);
    }
  }

  console.log("Extracted ngoID:", ngoID);

  useEffect(() => {
    if (ngoID) {
      fetch(`http://localhost:2000/NGO/getDeserving/${ngoID}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setSavedDeserving(data.data);
          }
        })
        .catch((error) => console.error("Error fetching deserving data:", error));
    }
  }, [ngoID]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const header = jsonData[0] || [];
        const body = jsonData.slice(1);
        setRows({ header, body });

        setSnackbar({ open: true, message: "Excel uploaded and data extracted successfully!", severity: "success" });

        handleSaveBulkData(header, body);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveBulkData = (header = rows.header, body = rows.body) => {
    fetch("http://localhost:2000/NGO/addDeservingBulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deservingRecords: body.map((row) => ({
          name: row[0],
          gender: row[1],
          ageGroup: row[2],
          phoneNo: row[3],
          ngoID: parseInt(ngoID),
        })),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setSnackbar({ open: true, message: "Bulk data saved successfully!", severity: "success" });
          fetch(`http://localhost:2000/NGO/getDeserving/${ngoID}`)
            .then((response) => response.json())
            .then((data) => setSavedDeserving(data.data));
        }
      })
      .catch((error) => console.error("Error saving bulk data:", error));
  };

  const handleAddIndividualData = () => {
    fetch("http://localhost:2000/NGO/addDeserving", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        ngoID: parseInt(ngoID),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setSnackbar({ open: true, message: "Individual data added successfully!", severity: "success" });
          fetch(`http://localhost:2000/NGO/getDeserving/${ngoID}`)
            .then((response) => response.json())
            .then((data) => setSavedDeserving(data.data));
        }
      })
      .catch((error) => console.error("Error adding individual data:", error));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: "100vh", 
    bgcolor: "#e0e0e0", 
  }}
>
  <Box
    sx={{
      maxWidth: "800px",
      width: "90%",
      p: 4,
      bgcolor: "#fff",
      borderRadius: "12px",
      boxShadow: 3,
    }}
  >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
            Recipient Table
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            <Button variant="contained" component="label">
              Upload Excel File
              <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
            </Button>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
              Add New Entry
            </Button>
          </Box>
          {savedDeserving.length > 0 ? (
            <TableContainer sx={{ marginTop: "20px", border: "1px solid #ddd", borderRadius: "8px", maxHeight: "400px" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {["Name", "Gender", "Age Group", "Phone No"].map((col, index) => (
                      <TableCell
                        key={index}
                        sx={{ fontWeight: "bold", color: "#fff", textAlign: "center", backgroundColor: theme.palette.primary.main }}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {savedDeserving.map((row, rowIndex) => (
                    <TableRow key={rowIndex} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f0f0f0" } }}>
                      <TableCell sx={{ textAlign: "center" }}>{row.name}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{row.gender}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{row.ageGroup}</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{row.phoneNo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" align="center" sx={{ marginTop: "20px", color: "#777" }}>
              No data available. Please upload an Excel file or add a new entry.
            </Typography>
          )}
        </Box>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Recipient
          </Typography>
          <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Age Group" name="ageGroup" value={formData.ageGroup} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Phone No" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} />
          <Button variant="contained" color="primary" onClick={handleAddIndividualData} sx={{ mt: 2 }}>
            Add
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default ExcelToMuiTable;
