import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import {
  Container,
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slider,
  TextField,
  Snackbar,
  Alert,
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
    mode: "",  // New field for mode (pickup or delivery)
  });

  const [ngos, setNgos] = useState([]);
  const [brands, setBrands] = useState([]);

  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // "success" or "error"

  // Fetch NGOS and Brands on component mount
  useEffect(() => {
    // Fetch NGOs
    fetch("http://localhost:2000/Users/getAllNGOs")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setNgos(data.data);
        }
      })
      .catch((error) => console.error("Error fetching NGOs:", error));

    // Fetch Brands
    fetch("http://localhost:2000/Users/getAllBrands")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setBrands(data.data);
        }
      })
      .catch((error) => console.error("Error fetching Brands:", error));
  }, []);

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

    const { clothName, brand, ageGroup, gender, condition, material, donateTo, image, mode } = formData;
    const user = cookie.get("userDetails");
    const user1 = JSON.parse(user);
    const userID = user1[0].userID;
    
    const donationData = {
      clothName,
      brandID: brands.find((brandItem) => brandItem.brandName === brand)?.brandID,
      ageGroup,
      gender,
      condition,
      material,
      ngoID: ngos.find((ngoItem) => ngoItem.ngoName === donateTo)?.ngoID,
      userID: userID, 
      picture: image ? image.name : "",
      status: "Pending",
      mode, 
    };

    // Submit donation data
    fetch("http://localhost:2000/Users/addPending", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setSnackbarMessage("Donation request submitted successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          window.scrollTo(0, 0);
          navigate("/User");
        }
      })
      .catch((error) => {
        setSnackbarMessage("Error submitting donation.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error("Error submitting donation:", error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
        overflowY: "auto",
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
            {ngos.map((ngo) => (
              <MenuItem key={ngo.ngoID} value={ngo.ngoName}>
                {ngo.ngoName}
              </MenuItem>
            ))}
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
            {brands.map((brand) => (
              <MenuItem key={brand.brandID} value={brand.brandName}>
                {brand.brandName}
              </MenuItem>
            ))}
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
            {["Male", "Female"].map((genderOption) => (
              <MenuItem key={genderOption} value={genderOption}>
                {genderOption}
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
            {["0-5", "6-10", "11-20", "21-35"].map((ageOption) => (
              <MenuItem key={ageOption} value={ageOption}>
                {ageOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Material (Text Field) */}
        <TextField
          label="Material"
          name="material"
          value={formData.material}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: "15px" }}
        />

        {/* Cloth Name (Text Field) */}
        <TextField
          label="Cloth Name"
          name="clothName"
          value={formData.clothName}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: "15px" }}
        />

        {/* Mode (Pickup or Delivery) */}
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel>Mode</InputLabel>
          <Select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            required
          >
            {["Pickup", "Delivery"].map((modeOption) => (
              <MenuItem key={modeOption} value={modeOption}>
                {modeOption}
              </MenuItem>
            ))}
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
        <Box sx={{ marginBottom: "20px", marginTop: "20px" }}>
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

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DonateMore;
