import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
  Modal,
  Button
} from "@mui/material";
import Cookies from "js-cookie";

const ClothesDonationPage = () => {
  const navigate = useNavigate();
    const [clothesData, setClothesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    // const [clothesData, setClothesData] = useState([]);
  const [donatedData, setDonatedData] = useState([]);
//   const [loading, setLoading] = useState(true);
const [discardedData, setDiscardedData] = useState([]);
    useEffect(() => {
      const fetchClothesData = async () => {
        try {
          const ngoDetails = Cookies.get("ngoDetails");
          if (!ngoDetails) {
            console.error("No NGO details found in cookies");
            setLoading(false);
            return;
          }
    
          const parsedNgoDetails = JSON.parse(ngoDetails);
          const ngoID = parsedNgoDetails[0]?.ngoID || null;
    
          if (!ngoID) {
            console.error("NGO ID not found in parsed cookie data");
            setLoading(false);
            return;
          }
    
          const selectedBrand = Cookies.get("selectedBrand");
          if (!selectedBrand) {
            console.error("No Brand details found in cookies");
            setLoading(false);
            return;
          }
    
          const parsedBrand = JSON.parse(selectedBrand);
          const brandId = parsedBrand?.brandID || null;
    
          if (!brandId) {
            console.error("Brand ID not found in parsed cookie data");
            setLoading(false);
            return;
          }
    
          console.log("NGO ID:", ngoID);
          console.log("Brand ID:", brandId);
    
          const response = await fetch(`http://localhost:2000/NGO/getDonation/${ngoID}/${brandId}`);
          const result = await response.json();
    
          if (result.status === "success") {
            const formattedData = await Promise.all(
              result.data.map(async (item, index) => {
                if (!item.picture || !item.picture.data) {
                  console.error(`Image data missing for item ${index}`);
                  return {
                    id: item.donationID,
                    name: item.userName,
                    clothName: item.clothName,
                    ageGroup: item.ageGroup,
                    gender: item.gender === "M" ? "Male" : "Female",
                    condition: item.conditions,
                    material: item.material,
                    picture: null,
                  };
                }
    
                // Convert Blob to Object URL
                const blob = new Blob([new Uint8Array(item.picture.data)], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);
                console.log(`Generated Image URL for item ${index}:`, imageUrl);
    
                return {
                  id: item.donationID,
                  name: item.userName,
                  clothName: item.clothName,
                  ageGroup: item.ageGroup,
                  gender: item.gender === "M" ? "Male" : "Female",
                  condition: item.conditions,
                  material: item.material,
                  picture: imageUrl,  // Store URL to use in UI
                };
              })
            );
    
            setClothesData(formattedData);
          } else {
            console.error("Failed to fetch donation data:", result.message);
          }
        } catch (error) {
          console.error("Error fetching donation data:", error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchClothesData();
    }, []);
    useEffect(() => {
        const fetchDonatedData = async () => {
          try {
            const ngoDetails = Cookies.get("ngoDetails");
            const selectedBrand = Cookies.get("selectedBrand");
    
            if (!ngoDetails || !selectedBrand) {
              console.error("Missing cookie data for donated items");
              return;
            }
    
            const ngoID = JSON.parse(ngoDetails)[0]?.ngoID;
            const brandId = JSON.parse(selectedBrand)?.brandID;
    
            if (!ngoID || !brandId) {
              console.error("Invalid NGO ID or Brand ID for donated items");
              return;
            }
    
            // Fetch donated clothes data
            const response = await fetch(`http://localhost:2000/NGO/getDonated/${ngoID}/${brandId}`);
            const result = await response.json();
    
            if (result.status === "success") {
              setDonatedData(result.data);
            } else {
              console.error("Failed to fetch donated data:", result.message);
            }
          } catch (error) {
            console.error("Error fetching donated data:", error);
          }
        };
    
        fetchDonatedData();
      }, []);
      useEffect(() => {
        const fetchDiscardedData = async () => {
          try {
            const ngoDetails = Cookies.get("ngoDetails");
            const selectedBrand = Cookies.get("selectedBrand");
    
            if (!ngoDetails || !selectedBrand) {
              console.error("Missing cookie data for discarded items");
              return;
            }
    
            const ngoID = JSON.parse(ngoDetails)[0]?.ngoID;
            const brandId = JSON.parse(selectedBrand)?.brandID;
    
            if (!ngoID || !brandId) {
              console.error("Invalid NGO ID or Brand ID for discarded items");
              return;
            }
    
            // Fetch discarded clothes data
            const response = await fetch(`http://localhost:2000/NGO/getDiscarded/${ngoID}/${brandId}`);
            const result = await response.json();
    
            if (result.status === "success") {
              setDiscardedData(result.data);
            } else {
              console.error("Failed to fetch discarded data:", result.message);
            }
          } catch (error) {
            console.error("Error fetching discarded data:", error);
          }
        };
    
        fetchDiscardedData();
      }, []);

      const [donationPeople, setDonationPeople] = useState([]);

      useEffect(() => {
        // Retrieve ngoDetails from the cookie
        const ngoDetails = Cookies.get('ngoDetails');
        
        // Parse the ngoDetails and get the ngoID
        if (ngoDetails) {
          const parsedNgoDetails = JSON.parse(ngoDetails);
          const ngoID = parsedNgoDetails[0]?.ngoID;
    
          if (ngoID) {
            // Fetch deserving individuals based on ngoID
            fetch(`http://localhost:2000/NGO/getDeserving/${ngoID}`)
              .then((response) => response.json())
              .then((data) => {
                if (data.status === 'success') {
                  // Update the donationPeople state with names of deserving individuals
                  const people = data.data.map((person) => person.name);
                  setDonationPeople(people);
                } else {
                  console.error('Failed to fetch deserving individuals');
                }
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
              });
          }
        }
      }, []);

  const [discardSuggestions, setDiscardSuggestions] = useState([
    "Recycle",
    "Repurpose",
    "Sell",
  ]);

//   const [selectedImage, setSelectedImage] = useState(null);


const handleDiscardAction = async (id) => {
  try {
    console.log(id);
    const response = await fetch("http://localhost:2000/NGO/addDiscarded", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ donationID: id }), // Send donationID in the body
    });

    const result = await response.json();

    if (result.status === "success") {
      console.log(`Donation ${id} discarded successfully`);
    } else {
      console.error("Failed to discard item:", result.message);
    }
  } catch (error) {
    console.error("Error discarding item:", error);
  }
};


const handleActionChange = (event, id) => {
  const updatedData = clothesData.map((item) =>
    item.id === id
      ? { ...item, action: event.target.value, donateTo: "" }
      : item
  );
  setClothesData(updatedData);

  if (event.target.value === "Discard") {
    handleDiscardAction(id); // Call the discard action API
  }
};


const handleDonateToChange = async (event, id) => {
  const updatedData = clothesData.map((item) =>
    item.id === id ? { ...item, donateTo: event.target.value } : item
  );
  setClothesData(updatedData);

  const donationID = id;  // The donation ID is passed as the ID in the state
  const deservingID = 5;   // Keep deservingID constant as 5

  try {
    // Make API call to add donated data
    const response = await fetch("http://localhost:2000/NGO/addDonated", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        donationID: donationID,
        deservingID: deservingID, // Constant deserving ID
      }),
    });

    const result = await response.json();
    if (result.status === "success") {
      console.log(`Donation ${donationID} successfully added for deserving ID ${deservingID}`);
    } else {
      console.error("Failed to add donation:", result.message);
    }
  } catch (error) {
    console.error("Error adding donation:", error);
  }
};


  const handleSuggestionChange = (event, id) => {
    const updatedData = clothesData.map((item) =>
      item.id === id ? { ...item, suggestion: event.target.value } : item
    );
    setClothesData(updatedData);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleClick = () => {
    navigate('/status');
  };

  return (
    <Container
      sx={{
        marginTop: 4,
        padding: 2,
        borderRadius: 2,
        maxHeight: "100vh",
        overflowY: "auto", // Allows vertical scrolling
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          color: "#2b6777",
        }}
      >
        Clothes Donation Management
      </Typography>
      <Button
      onClick={handleClick}
      sx={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: '#45a049',
        },
        '&:active': {
          backgroundColor: '#3e8e41',
        },
      }}
    >
      Check Status
    </Button>

      {/* Clothes Table */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: "#2b6777",
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
  {loading ? (
    <TableRow>
      <TableCell colSpan={9} align="center">
        Loading clothes data...
      </TableCell>
    </TableRow>
  ) : clothesData.length > 0 ? (
    clothesData.map((row) => (
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
              value={row.action || ""}
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
                value={row.donateTo || ""}
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
              
            </FormControl>
          ) : null}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={9} align="center">
        No clothes data available.
      </TableCell>
    </TableRow>
  )}
</TableBody>
          </Table>
        </TableContainer>
      </Box>


      {/* Donation Record Table */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, color: "#2b6777" }}>
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
              {donatedData.length > 0 ? (
                donatedData
                  .filter(
                    (row) =>
                      row.donatedBy &&
                      row.donatedTo &&
                      row.gender === "M" && // Filtering for Male gender
                      row.ageGroup === "18-25" // Adjust as needed
                  )
                  .map((row) => (
                    <TableRow key={row.donatedID}>
                      <TableCell>{row.donatedBy}</TableCell>
                      <TableCell>{row.donatedTo}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.ageGroup}</TableCell>
                      <TableCell>{row.material}</TableCell>
                      <TableCell>{row.clothName}</TableCell>
                      <TableCell>{row.conditions}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No donation records available.
                  </TableCell>
                </TableRow>
              )}
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
          color: "#2b6777",
        }}
      >
        Discard Records
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0" }}>
        <Table sx={{ minWidth: 650 }} aria-label="discard record table">
          <TableHead sx={{ backgroundColor: "#2b6777" }}>
            <TableRow>
              {["Name", "Cloth Name", "Material", "Suggestion"].map((header) => (
                <TableCell key={header} sx={{ color: "#ffffff" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {discardedData.length > 0 ? (
              discardedData.map((row) => (
                <TableRow key={row.discardedID}>
                  <TableCell>{row.userName}</TableCell>
                  <TableCell>{row.clothName}</TableCell>
                  <TableCell>{row.material}</TableCell>
                  <TableCell>{row.suggestions}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No discarded data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Container>
  );
};

export default ClothesDonationPage;



// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import {
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Box,
//   Typography,
//   Modal,
//   CircularProgress,
// } from "@mui/material";

// const ClothesDonationPage = () => {
//   const [clothesData, setClothesData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const fetchClothesData = async () => {
//       try {
//         const ngoDetails = Cookies.get("ngoDetails");
//         if (!ngoDetails) {
//           console.error("No NGO details found in cookies");
//           setLoading(false);
//           return;
//         }
  
//         const parsedNgoDetails = JSON.parse(ngoDetails);
//         const ngoID = parsedNgoDetails[0]?.ngoID || null;
  
//         if (!ngoID) {
//           console.error("NGO ID not found in parsed cookie data");
//           setLoading(false);
//           return;
//         }
  
//         const selectedBrand = Cookies.get("selectedBrand");
//         if (!selectedBrand) {
//           console.error("No Brand details found in cookies");
//           setLoading(false);
//           return;
//         }
  
//         const parsedBrand = JSON.parse(selectedBrand);
//         const brandId = parsedBrand?.brandID || null;
  
//         if (!brandId) {
//           console.error("Brand ID not found in parsed cookie data");
//           setLoading(false);
//           return;
//         }
  
//         console.log("NGO ID:", ngoID);
//         console.log("Brand ID:", brandId);
  
//         const response = await fetch(`http://localhost:2000/NGO/getDonation/${ngoID}/${brandId}`);
//         const result = await response.json();
  
//         if (result.status === "success") {
//           const formattedData = await Promise.all(
//             result.data.map(async (item, index) => {
//               if (!item.picture || !item.picture.data) {
//                 console.error(`Image data missing for item ${index}`);
//                 return {
//                   id: item.donationID,
//                   name: item.userName,
//                   clothName: item.clothName,
//                   ageGroup: item.ageGroup,
//                   gender: item.gender === "M" ? "Male" : "Female",
//                   condition: item.conditions,
//                   material: item.material,
//                   picture: null,
//                 };
//               }
  
//               // Convert Blob to Object URL
//               const blob = new Blob([new Uint8Array(item.picture.data)], { type: 'image/png' });
//               const imageUrl = URL.createObjectURL(blob);
//               console.log(`Generated Image URL for item ${index}:`, imageUrl);
  
//               return {
//                 id: item.donationID,
//                 name: item.userName,
//                 clothName: item.clothName,
//                 ageGroup: item.ageGroup,
//                 gender: item.gender === "M" ? "Male" : "Female",
//                 condition: item.conditions,
//                 material: item.material,
//                 picture: imageUrl,  // Store URL to use in UI
//               };
//             })
//           );
  
//           setClothesData(formattedData);
//         } else {
//           console.error("Failed to fetch donation data:", result.message);
//         }
//       } catch (error) {
//         console.error("Error fetching donation data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchClothesData();
//   }, []);
  

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" align="center" gutterBottom>
//         Clothes Donation Management
//       </Typography>
//       {loading ? (
//         <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Picture</TableCell>
//                 <TableCell>Cloth Name</TableCell>
//                 <TableCell>Age Group</TableCell>
//                 <TableCell>Gender</TableCell>
//                 <TableCell>Condition</TableCell>
//                 <TableCell>Material</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {clothesData.map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{row.name}</TableCell>
//                   <TableCell>
//                     <img
//                       src={row.picture}
//                       alt={row.clothName}
//                       style={{ width: "50px", height: "50px", cursor: "pointer" }}
//                       onClick={() => handleImageClick(row.picture)}
//                     />
//                   </TableCell>
//                   <TableCell>{row.clothName}</TableCell>
//                   <TableCell>{row.ageGroup}</TableCell>
//                   <TableCell>{row.gender}</TableCell>
//                   <TableCell>{row.condition}</TableCell>
//                   <TableCell>{row.material}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//       <Modal open={!!selectedImage} onClose={handleCloseModal}>
//         <Box>
//           <img src={selectedImage} alt="Preview" style={{ width: "100%" }} />
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default ClothesDonationPage;