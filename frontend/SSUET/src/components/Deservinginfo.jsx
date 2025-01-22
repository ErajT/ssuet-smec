import React, { useState } from "react";
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
} from "@mui/material";
import * as XLSX from "xlsx";

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
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddRow = () => {
    setRows({
      header: ["Name", "Gender", "Age Group", "Phone No"],
      body: [...rows.body, Object.values(formData)],
    });
    setOpen(false);
    setFormData({ name: "", gender: "", ageGroup: "", phoneNo: "" });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
      }}>
        <Box sx={{
          width: "100%",
          maxWidth: "800px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#fff",
          textAlign: "center",
        }}>
          <Typography variant="h3" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
            Recipient Table
          </Typography>
          <Button variant="contained" component="label" sx={{ marginBottom: "20px" }}>
            Upload Excel File
            <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add New Entry
          </Button>
          {rows.header.length > 0 ? (
            <TableContainer sx={{ marginTop: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                    {rows.header.map((col, index) => (
                      <TableCell key={index} sx={{ fontWeight: "bold", color: "#fff", textAlign: "center" }}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.body.map((row, rowIndex) => (
                    <TableRow key={rowIndex} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f0f0f0" } }}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} sx={{ textAlign: "center" }}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" align="center" sx={{ marginTop: "20px", color: "#777" }}>
              No data available. Please upload an Excel file.
            </Typography>
          )}
        </Box>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}>
          <Typography variant="h6" gutterBottom>Add New Recipient</Typography>
          <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Age Group" name="ageGroup" value={formData.ageGroup} onChange={handleInputChange} />
          <TextField fullWidth margin="normal" label="Phone No" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} />
          <Button variant="contained" color="primary" onClick={handleAddRow} sx={{ mt: 2 }}>
            Add
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default ExcelToMuiTable;
