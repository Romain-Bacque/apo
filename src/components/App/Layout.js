import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CustomSnackbars from "../UI/CustomSnackbars";
import Header from "../Header";
import Footer from "../Footer";

// Style
const Main = styled(Box)(({ theme }) => ({
  margin: "2rem",
  fontFamily: "Silkscreen",
  [theme.breakpoints.down("md")]: {
    margin: "0",
  },
}));

const Layout = (props) => {
  const appBarRef = useRef();
  const loading = useSelector((state) => state.loading);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (loading.statut !== "pending" && loading.message) {
      setIsOpen(true);
    }
  }, [loading]);

  return (
    <>
      {loading.statut !== "pending" && loading.message && (
        <CustomSnackbars
          message={loading.message}
          statut={loading.statut}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <Header ref={appBarRef} />
      <Main
        height={`calc(100vh - ${appBarRef.current?.clientHeight || "60"}px)`}
        component="main"
      >
        {props.children}
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
