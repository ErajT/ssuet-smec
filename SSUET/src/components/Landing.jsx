// import React, { useState, useEffect, useRef } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Grid,
//   useMediaQuery,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Container,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { styled, keyframes } from "@mui/system";
// import { Link } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import { FaBox, FaHandshake, FaShieldAlt } from "react-icons/fa";

// // Keyframes for animations
// const fadeInRight = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;

// const fadeInLeft = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(-20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;

// const parallax = keyframes`
//   0% { background-position: center top; }
//   100% { background-position: center bottom; }
// `;

// // Full-height section with dynamic background image and parallax effect
// const FullHeightSection = styled("section")(() => ({
//   height: "100vh",
//   width: "100%",
//   backgroundImage: `url(/main.png)`,
//   backgroundSize: "cover",
//   backgroundPosition: "center center",
//   position: "relative",
//   animation: `${parallax} 10s ease-in-out infinite alternate`,
//   backgroundAttachment: "fixed", // This ensures the parallax effect works well
//   "@media (max-width: 768px)": {
//     backgroundImage: `url(/main1.png)`,
//     animation: `${parallax} 5s ease-in-out infinite alternate`,
//   },
// }));


// // Styled components
// const Navbar = styled(AppBar)(({ isTransparent }) => ({
//   backgroundColor: isTransparent ? "transparent" : "#2b6777",
//   transition: "background-color 0.3s ease-in-out",
//   boxShadow: isTransparent ? "none" : "0px 4px 6px rgba(0, 0, 0, 0.1)",
// }));

// const LoginButton = styled(Button)(({ inSection1 }) => ({
//   borderRadius: "20px",
//   padding: "8px 20px",
//   fontWeight: "bold",
//   fontSize: "14px",
//   backgroundColor: inSection1 ? "rgba(255, 255, 255, 0.8)" : "#f5f5f5",
//   color: inSection1 ? "#2b6777" : "#2b6777",
//   border: "1px solid #2b6777",
//   "&:hover": {
//     backgroundColor: "#2b6777",
//     color: "#fff",
//   },
// }));

// const Section = styled("section")(() => ({
//   padding: "80px 20px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   background: "linear-gradient(to right, #e1eef6, #ffffff)",
//   boxShadow: "0px 8px 16px rgba(0, 0, 0, 1.2)",
// }));

// const SectionContent = styled(Container)(() => ({
//   maxWidth: "1200px",
// }));

// const SectionHeading = styled(Typography)(() => ({
//   fontSize: "4rem",
//   fontWeight: "bold",
//   marginBottom: "40px",
//   color: "#2b6777",
//   textAlign: "center",
// }));

// const ImageWrapper = styled("div")(() => ({
//   boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)",
//   borderRadius: "10px",
//   overflow: "hidden",
// }));

// const Footer = styled("footer")(() => ({
//   backgroundColor: "#2b6777",
//   color: "#fff",
//   padding: "20px 0",
//   textAlign: "center",
// }));

// // Main App Component
// const App = () => {
//   const [navbarTransparent, setNavbarTransparent] = useState(true);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const sectionRefs = useRef([]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const sectionId = entry.target.id;
//             setNavbarTransparent(sectionId === "section1");
//           }
//         });
//       },
//       { threshold: 0.7 }
//     );

//     sectionRefs.current.forEach((section) => {
//       if (section) observer.observe(section);
//     });

//     return () => {
//       sectionRefs.current.forEach((section) => {
//         if (section) observer.unobserve(section);
//       });
//     };
//   }, []);

//   const scrollToSection = (id) => {
//     document.getElementById(id).scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div>
      // <Navbar position="fixed" isTransparent={navbarTransparent}>
      //   <Toolbar sx={{ justifyContent: "space-between" }}>
      //     <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      //       Logo
      //     </Typography>
      //     {isMobile ? (
      //       <>
      //         <IconButton onClick={() => setDrawerOpen(true)}>
      //           <MenuIcon sx={{ color: navbarTransparent ? "#fff" : "#f5f5f5" }} />
      //         </IconButton>
      //         <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      //           <List>
      //             {["section1", "section2", "section3", "section4"].map((section) => (
      //               <ListItem
      //                 button
      //                 key={section}
      //                 onClick={() => {
      //                   scrollToSection(section);
      //                   setDrawerOpen(false);
      //                 }}
      //               >
      //                 <ListItemText primary={section.toUpperCase()} />
      //               </ListItem>
      //             ))}
      //             <Link to="/login" style={{ textDecoration: "none" }}>
      //               <Button sx={{ margin: "20px", background: "#2b6777", color: "#fff" }}>
      //                 Login
      //               </Button>
      //             </Link>
      //           </List>
      //         </Drawer>
      //       </>
      //     ) : (
      //       <Box>
      //         {["section1", "section2", "section3", "section4"].map((section) => (
      //           <Button
      //             key={section}
      //             onClick={() => scrollToSection(section)}
      //             sx={{
      //               color: navbarTransparent ? "#fff" : "#f5f5f5",
      //               fontWeight: "bold",
      //               marginRight: "20px",
      //             }}
      //           >
      //             {section.toUpperCase()}
      //           </Button>
      //         ))}
      //         <Link to="/login" style={{ textDecoration: "none" }}>
      //           <LoginButton inSection1={navbarTransparent}>Login</LoginButton>
      //         </Link>
      //       </Box>
      //     )}
      //   </Toolbar>
      // </Navbar>

//       {/* <Section id="section1" ref={(el) => (sectionRefs.current[0] = el)} /> */}
      // <FullHeightSection id="section1" ref={(el) => (sectionRefs.current[0] = el)} />


      // {["section2", "section3"].map((id, index) => (
      //   <Section id={id} ref={(el) => (sectionRefs.current[index + 1] = el)} key={id}>
      //     <SectionContent>
      //       <Grid
      //         container
      //         spacing={4}
      //         alignItems="center"
      //         direction={isMobile ? "column-reverse" : id === "section3" ? "row-reverse" : "row"}
      //       >
      //         <Grid
      //           item
      //           xs={12}
      //           md={6}
      //           sx={{
      //             animation: `${id === "section2" ? fadeInRight : fadeInLeft} s ease-in-out`,
      //           }}
      //         >
      //           <ImageWrapper>
      //             <img
      //               src={id === "section2" ? "/lap.png" : "/form.png"}
      //               alt={`Section ${index + 2}`}
      //               style={{ width: "100%" }}
      //             />
      //           </ImageWrapper>
      //         </Grid>
      //         <Grid item xs={12} md={6}>
      //           <Typography
      //             variant="h4"
      //             sx={{ marginBottom: "20px", color: "#2b6777", fontSize: "3rem" }}
      //           >
      //             {id === "section2" ? "Leaderboard" : "Application Form"}
      //           </Typography>
      //           <Typography sx={{ fontSize: "1.6rem", color: "#2b6777" }}>
      //             {id === "section2" ? "Celebrate your achievements and see how you rank! The leaderboard highlights top performers, fostering healthy competition and motivation. Keep applying, sharing, and climbing to the top!" : "Submit your progress and let your actions speak! Log your applications through text, photos, or references to showcase your dedication. Each submission brings you closer to the top of the leaderboard and inspires others in the community."} 
      //           </Typography>
      //         </Grid>
      //       </Grid>
      //     </SectionContent>
      //   </Section>
      // ))}
// {/* <Section
//   id="section4"
//   ref={(el) => (sectionRefs.current[3] = el)}
//   style={{
//     background: "linear-gradient(to right, #e1eef6, #ffffff)",
//     padding: "50px 20px",
//   }}
// >
//   <SectionContent>
//     <SectionHeading>What Clients Need</SectionHeading>
//     <Grid container spacing={4}>
//       {["Box 1", "Box 2", "Box 3"].map((box, index) => (
//         <Grid item xs={12} sm={4} key={index}>
//           <Card
//             sx={{
//               height: "280px", // Reduced height
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "space-around",
//               borderRadius: "16px",
//               boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
//               transition: "transform 0.3s ease, box-shadow 0.3s ease",
//               "&:hover": {
//                 transform: "translateY(-10px)",
//                 boxShadow: "0 16px 30px rgba(0, 0, 0, 0.6)",
//               },
//               padding: "15px",
//               background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "65px", // Slightly smaller icon container
//                 height: "65px",
//                 borderRadius: "50%",
//                 backgroundColor: "#2b6777",
//               }}
//             >
//               {index === 0 && <FaBox size={30} color="#fff" />} {/* Reduced icon size */}
//               {index === 1 && <FaHandshake size={30} color="#fff" />}
//               {index === 2 && <FaShieldAlt size={30} color="#fff" />}
//             </Box>
//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight: "bold",
//                 fontSize: "1.1rem", // Slightly smaller title font
//                 textAlign: "center",
//                 color: "#2b6777",
//                 marginBottom: "8px", // Reduced gap
//               }}
//             >
//               {box}
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: "0.95rem", // Adjusted description font size slightly
//                 textAlign: "center",
//                 color: "#555",
//               }}
//             >
//               Brief description for {box}.
//             </Typography>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   </SectionContent>
// </Section> */}



//       <Footer>
//         <Typography variant="body2">© 2024 Your Company. All rights reserved.</Typography>
//       </Footer>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { FaBox, FaHandshake, FaShieldAlt } from "react-icons/fa";

// Keyframes for animations
const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Define animations
const parallax = keyframes`
  0% { background-position: center top; }
  100% { background-position: center bottom; }
`;

// Styled components
const FullHeightSection = styled("section")(() => ({
  height: "100vh",
  width: "100vw",
  backgroundImage: "url(/main.png)",
  // backgroundImage: "url('http://localhost:5173/main.png')",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundAttachment: "fixed",
  animation: `${parallax} 10s ease-in-out infinite alternate`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  textAlign: "center",
  "@media (max-width: 1200px)": {
    backgroundImage: "url(/main1.png)",
  },
}));

const SectionHeading = styled(Typography)(() => ({
  fontSize: "4rem",
  fontWeight: "bold",
  marginBottom: "40px",
  color: "#2b6777",
  textAlign: "center",
}));
const LoginButton = styled(Button)(({ insection1 }) => ({
  borderRadius: "20px",
  padding: "8px 20px",
  fontWeight: "bold",
  fontSize: "14px",
  backgroundColor: insection1 ? "rgba(255, 255, 255, 0.8)" : "#f5f5f5",
  color: insection1 ? "#2b6777" : "#2b6777",
  border: "1px solid #2b6777",
  "&:hover": {
    backgroundColor: "#2b6777",
    color: "#fff",
  },
}));

const TextBox = styled("div")(() => ({
  position: "relative",
  padding: "20px 40px",
  borderRadius: "8px",
  fontSize: "1.75rem",
  fontWeight: "600",
  color: "#fff",
  maxWidth: "600px",
  textAlign: "center",
}));
const ImageWrapper = styled("div")(() => ({
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)",
  borderRadius: "10px",
  overflow: "hidden",
}));

const Navbar = styled(AppBar)(({ isTransparent }) => ({
  backgroundColor: isTransparent ? "transparent" : "#2b6777",
  transition: "background-color 0.3s ease-in-out",
  boxShadow: isTransparent ? "none" : "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const MainContainer = styled("div")(() => ({
  width: "100%",
  overflowX: "hidden",
}));

const Section = styled("section")(() => ({
  padding: "80px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(to right, #e1eef6, #ffffff)",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 1.2)",
}));

const Footer = styled("footer")(() => ({
  backgroundColor: "#2b6777",
  color: "#fff",
  padding: "20px 0",
  textAlign: "center",
}));
const SectionContent = styled(Container)(() => ({
  maxWidth: "1200px",
}));

const App = () => {
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setNavbarTransparent(sectionId === "section1");
          }
        });
      },
      { threshold: 0.7 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
      <MainContainer>
         <Navbar position="fixed" isTransparent={navbarTransparent}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Logo
          </Typography>
          {isMobile ? (
            <>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={{ color: navbarTransparent ? "#fff" : "#f5f5f5" }} />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                  {["section1", "section2", "section3", "section4"].map((section) => (
                    <ListItem
                      button
                      key={section}
                      onClick={() => {
                        scrollToSection(section);
                        setDrawerOpen(false);
                      }}
                    >
                      <ListItemText primary={section.toUpperCase()} />
                    </ListItem>
                  ))}
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button sx={{ margin: "20px", background: "#2b6777", color: "#fff" }}>
                      Login
                    </Button>
                  </Link>
                </List>
              </Drawer>
            </>
          ) : (
            <Box>
              {["section1", "section2", "section3", "section4"].map((section) => (
                <Button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  sx={{
                    color: navbarTransparent ? "#fff" : "#f5f5f5",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  {section.toUpperCase()}
                </Button>
              ))}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <LoginButton insection1={navbarTransparent}>Login</LoginButton>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Navbar>
        
      <FullHeightSection id="section1" ref={(el) => (sectionRefs.current[0] = el)} />
        {["section2", "section3"].map((id, index) => (
        <Section id={id} ref={(el) => (sectionRefs.current[index + 1] = el)} key={id}>
          <SectionContent>
            <Grid
              container
              spacing={4}
              alignItems="center"
              direction={isMobile ? "column-reverse" : id === "section3" ? "row-reverse" : "row"}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  animation: `${id === "section2" ? fadeInRight : fadeInLeft} s ease-in-out`,
                }}
              >
                <ImageWrapper>
                  <img
                    src={id === "section2" ? "/lap.png" : "/form.png"}
                    alt={`Section ${index + 2}`}
                    style={{ width: "100%" }}
                  />
                </ImageWrapper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  sx={{ marginBottom: "20px", color: "#2b6777", fontSize: "3rem" }}
                >
                  {id === "section2" ? "Leaderboard" : "Application Form"}
                </Typography>
                <Typography sx={{ fontSize: "1.6rem", color: "#2b6777" }}>
                  {id === "section2" ? "Celebrate your achievements and see how you rank! The leaderboard highlights top performers, fostering healthy competition and motivation. Keep applying, sharing, and climbing to the top!" : "Submit your progress and let your actions speak! Log your applications through text, photos, or references to showcase your dedication. Each submission brings you closer to the top of the leaderboard and inspires others in the community."} 
                </Typography>
              </Grid>
            </Grid>
          </SectionContent>
        </Section>
      ))}
      <Section
  id="section4"
  ref={(el) => (sectionRefs.current[3] = el)}
  style={{
    background: "linear-gradient(to right, #e1eef6, #ffffff)",
    padding: "50px 20px",
  }}
>
  <SectionContent>
    <SectionHeading>What Clients Need</SectionHeading>
    <Grid container spacing={4}>
      {["Box 1", "Box 2", "Box 3"].map((box, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card
            sx={{
              height: "280px", // Reduced height
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 16px 30px rgba(0, 0, 0, 0.6)",
              },
              padding: "15px",
              background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "65px", // Slightly smaller icon container
                height: "65px",
                borderRadius: "50%",
                backgroundColor: "#2b6777",
              }}
            >
              {index === 0 && <FaBox size={30} color="#fff" />} {/* Reduced icon size */}
              {index === 1 && <FaHandshake size={30} color="#fff" />}
              {index === 2 && <FaShieldAlt size={30} color="#fff" />}
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem", // Slightly smaller title font
                textAlign: "center",
                color: "#2b6777",
                marginBottom: "8px", // Reduced gap
              }}
            >
              {box}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.95rem", // Adjusted description font size slightly
                textAlign: "center",
                color: "#555",
              }}
            >
              Brief description for {box}.
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  </SectionContent>
</Section>
        <Footer>
          <Typography>Footer Content</Typography>
        </Footer>
      </MainContainer>
    // </ThemeProvider>
  );
};

export default App;