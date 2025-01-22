import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DonateMore = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    donateTo: "",
    brand: "",
    gender: "",
    ageGroup: "",
    material: "",
    clothName: "",
    condition: 3,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e, newValue) => {
    setFormData((prev) => ({ ...prev, condition: newValue }));
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    navigate("/User"); // Navigate to the User page after submission
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "50px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ marginBottom: "20px", color: "#2b6777" }}
      >
        Donate Clothes
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Donate To */}
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel>Donate To</InputLabel>
          <Select
            name="donateTo"
            value={formData.donateTo}
            onChange={handleChange}
            required
          >
            {["JDC", "Saylani"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        {/* Brand */}
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel>Brand</InputLabel>
          <Select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          >
            {["Khaddi", "J.", "Gul Ahmed", "Bonanza Satrangi", "Sana Safinaz"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        {/* Gender */}
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            {["Male", "Female"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Age Group */}
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel>Age Group</InputLabel>
          <Select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            required
          >
            {["0-5", "6-10", "11-20", "21-35"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Material */}
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel>Material</InputLabel>
          <Select
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
          >
            {["Cotton", "Wool"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Cloth Name */}
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel>Cloth Name</InputLabel>
          <Select
            name="clothName"
            value={formData.clothName}
            onChange={handleChange}
            required
          >
            {["Shirt", "Sweater", "Pant", "Trouser", "Socks", "Others"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        {/* Condition */}
        <Typography gutterBottom>Condition</Typography>
        <Slider
          value={formData.condition}
          min={1}
          max={5}
          step={1}
          marks={[
            { value: 1, label: "Worst" },
            { value: 2, label: "Bad" },
            { value: 3, label: "Average" },
            { value: 4, label: "Good" },
            { value: 5, label: "Best" },
          ]}
          onChange={handleSliderChange}
          sx={{ marginBottom: "20px" }}
        />

        {/* Upload Image */}
        <Box sx={{ marginBottom: "20px" }}>
          <Typography gutterBottom>Upload Image</Typography>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
        </Box>

        {/* Donate Now Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#2b6777",
            color: "#ffffff",
            display: "block",
            margin: "0 auto",
            "&:hover": {
              backgroundColor: "#1f4d56",
            },
          }}
          type="submit"
        >
          Donate Now
        </Button>
      </form>
    </Container>
  );
};

export default DonateMore;