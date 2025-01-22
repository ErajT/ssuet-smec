import React, { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";

const ClothesDonationPage = () => {
  const [clothesData, setClothesData] = useState([
    {
      id: 1,
      name: "John Doe",
      clothName: "T-shirt",
      ageGroup: "Adult",
      gender: "Male",
      condition: "Good",
      material: "Cotton",
      picture: "",
      action: "",
      suggestion: "",
      donateTo: "",
    },
    {
      id: 2,
      name: "Jane Doe",
      clothName: "Jacket",
      ageGroup: "Adult",
      gender: "Female",
      condition: "Worn",
      material: "Leather",
      picture: "",
      action: "",
      suggestion: "",
      donateTo: "",
    },
  ]);

  const [donationPeople, setDonationPeople] = useState([
    "John Smith",
    "Emily Davis",
    "Michael Clark",
  ]);

  const [discardSuggestions, setDiscardSuggestions] = useState([
    "Recycle",
    "Repurpose",
    "Sell",
  ]);

  const handleActionChange = (event, id) => {
    const updatedData = clothesData.map((item) =>
      item.id === id
        ? { ...item, action: event.target.value, donateTo: "" }
        : item
    );
    setClothesData(updatedData);
  };

  const handleDonateToChange = (event, id) => {
    const updatedData = clothesData.map((item) =>
      item.id === id ? { ...item, donateTo: event.target.value } : item
    );
    setClothesData(updatedData);
  };

  const handleSuggestionChange = (event, id) => {
    const updatedData = clothesData.map((item) =>
      item.id === id ? { ...item, suggestion: event.target.value } : item
    );
    setClothesData(updatedData);
  };

  return (
    <Container
      sx={{
        marginTop: 4,
        // backgroundColor: "#f2f2f2", // Light grey background
        padding: 2,
        borderRadius: 2,
        maxHeight: "100vh",
        // overflowY: "auto", // Allows vertical scrolling
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          color: "#2b6777", // Primary theme color
        }}
      >
        Clothes Donation Management
      </Typography>

      {/* Clothes Table */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: "#2b6777", // Primary theme color
          }}
        >
          Clothes Information
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="clothes table">
            <TableHead sx={{ backgroundColor: "#2b6777" }}>
              <TableRow>
                {[
                  "Name",
                  "Cloth Name",
                  "Age Group",
                  "Gender",
                  "Condition",
                  "Material",
                  "Action",
                  "Suggestion / Donate To",
                ].map((header) => (
                  <TableCell key={header} sx={{ color: "#ffffff" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clothesData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.clothName}</TableCell>
                  <TableCell>{row.ageGroup}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.condition}</TableCell>
                  <TableCell>{row.material}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel>Action</InputLabel>
                      <Select
                        value={row.action}
                        onChange={(e) => handleActionChange(e, row.id)}
                        label="Action"
                      >
                        <MenuItem value="Donate">Donate</MenuItem>
                        <MenuItem value="Discard">Discard</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {row.action === "Donate" ? (
                      <FormControl fullWidth>
                        <InputLabel>Donate To</InputLabel>
                        <Select
                          value={row.donateTo}
                          onChange={(e) => handleDonateToChange(e, row.id)}
                          label="Donate To"
                        >
                          {donationPeople.map((person, index) => (
                            <MenuItem key={index} value={person}>
                              {person}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : row.action === "Discard" ? (
                      <FormControl fullWidth>
                        <InputLabel>Suggestion</InputLabel>
                        <Select
                          value={row.suggestion}
                          onChange={(e) => handleSuggestionChange(e, row.id)}
                          label="Suggestion"
                        >
                          {discardSuggestions.map((suggestion, index) => (
                            <MenuItem key={index} value={suggestion}>
                              {suggestion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Donation Record Table */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: "#2b6777", // Primary theme color
          }}
        >
          Donation Records
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="donation record table">
            <TableHead sx={{ backgroundColor: "#2b6777" }}>
              <TableRow>
                {[
                  "Donated By",
                  "Donated To",
                  "Gender",
                  "Age Group",
                  "Material",
                  "Cloth Name",
                  "Condition",
                ].map((header) => (
                  <TableCell key={header} sx={{ color: "#ffffff" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clothesData
                .filter((row) => row.action === "Donate" && row.donateTo)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.donateTo}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.ageGroup}</TableCell>
                    <TableCell>{row.material}</TableCell>
                    <TableCell>{row.clothName}</TableCell>
                    <TableCell>{row.condition}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Discard Record Table */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: "#2b6777", // Primary theme color
          }}
        >
          Discard Records
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="discard record table">
            <TableHead sx={{ backgroundColor: "#2b6777" }}>
              <TableRow>
                {["Name", "Cloth Name", "Material", "Suggestion"].map(
                  (header) => (
                    <TableCell key={header} sx={{ color: "#ffffff" }}>
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {clothesData
                .filter((row) => row.action === "Discard" && row.suggestion)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.clothName}</TableCell>
                    <TableCell>{row.material}</TableCell>
                    <TableCell>{row.suggestion}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ClothesDonationPage;