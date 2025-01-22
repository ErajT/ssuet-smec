import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const BrandsPage = () => {
  // Static data for brands
  const brands = [
    {
      brandID: 1,
      brandImage: "https://i.dawn.com/primary/2022/01/61e66fbaa8fdb.png", // Replace with your image URLs
      brandName: "Khaadi",
    },
    {
      brandID: 2,
      brandImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHqtDj0kSBxDkSlqUoy7QwJHWgTHOhHo6BsA&s",
      brandName: "J.",
    },
    {
      brandID: 3,
      brandImage: "https://tufailgroup.com/wp-content/uploads/2017/01/gul-ahmed-textiles.png",
      brandName: "Gul Ahmed",
    },
  ];

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
            <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
              <CardMedia
                sx={{ height: 140, objectFit: "contain", // Ensures the image fits within the container
                    backgroundSize: "contain", // Ensures no overflow
                    backgroundPosition: "center", // Centers the image
                    backgroundRepeat: "no-repeat", }}
                image={brand.brandImage} // Static image
                title={brand.brandName} // Brand name as title
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {brand.brandName} {/* Static brand name */}
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
