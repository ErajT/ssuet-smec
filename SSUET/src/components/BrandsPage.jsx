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
import Box from "@mui/material/Box";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Parse NGO details from cookies
  const ngoDetails = Cookies.get("ngoDetails")
    ? JSON.parse(Cookies.get("ngoDetails"))[0]
    : {};
  const ngoName = ngoDetails.ngoName || "Unknown NGO";

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("http://localhost:2000/Users/getAllBrands/");
        if (!response.ok) {
          throw new Error("Failed to fetch brands");
        }
        const result = await response.json();
        setBrands(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const handleCardClick = (brand) => {
    Cookies.set("selectedBrand", JSON.stringify(brand));
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
    <Container sx={{ marginTop: 4, maxHeight: "auto" }}>
     <Box
  sx={{
    maxwidth: "100vw",
    height: "260px", // Adjusted the height to ensure the image fits well
    // marginTop: "4",
    backgroundImage: "url(/back.png)",
    backgroundSize: "cover",
    backgroundPosition: "top center", // Ensures the top part of the image is visible
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "20px",
    marginLeft: "50px",
    marginTop:"300px",
    color: "white",
    textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
  }}
>
  <Typography variant="h4" fontWeight="bold">
    NGO Name :{ngoName}
  </Typography>
</Box>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#2b6777", marginBottom: 4, marginTop: 4 }}
      >
        Brands
      </Typography>
      <Grid container spacing={4}>
        {brands.map((brand) => (
          <Grid item xs={12} sm={6} md={4} key={brand.brandID}>
            <Card
              sx={{ maxWidth: 345, margin: "10px 10px", cursor: "pointer" }}
              onClick={() => handleCardClick(brand)}
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
                }
                title={brand.brandName}
              />
              <CardContent
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60px" }}
              >
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", fontWeight: "bold" }}>
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
