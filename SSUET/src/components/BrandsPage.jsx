import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]); // State to hold fetched brands
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    // Fetch brands from the API
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:2000/Users/getAllBrands/");
        if (!response.ok) {
          throw new Error("Failed to fetch brands");
        }
        const result = await response.json();
        setBrands(result.data); // Set brands data
      } catch (err) {
        setError(err.message); // Set error if any
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchBrands();
  }, []);

  const handleCardClick = (brand) => {
    // Save brand details in a cookie
    Cookies.set("selectedBrand", JSON.stringify(brand)); // Expires in 1 day

    // Navigate to /ngotable
    navigate("/ngotable");
  };

  if (loading) {
    return (
      <Container sx={{ marginTop: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading brands...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#2b6777", marginBottom: 4 }}
      >
        Brands
      </Typography>
      <Grid container spacing={4}>
        {brands.map((brand) => (
          <Grid item xs={12} sm={6} md={4} key={brand.brandID}>
            <Card
              sx={{ maxWidth: 345, margin: "0 auto", cursor: "pointer" }}
              onClick={() => handleCardClick(brand)} // Handle card click
            >
              <CardMedia
                sx={{
                  height: 140,
                  objectFit: "contain",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                image={
                  brand.Image
                    ? brand.Image
                    : "https://via.placeholder.com/140x100?text=No+Image"
                } // Handle null images
                title={brand.brandName}
              />
              <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60px", // Adjust as needed to ensure the content area has enough height
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  textAlign: "center", // Centers text within its container
                  fontWeight: "bold", // Optional: makes the text more prominent
                }}
              >
                {brand.brandName}
              </Typography>
            </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BrandsPage;
