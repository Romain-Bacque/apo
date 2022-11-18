import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import CustomSnackbars from "../UI/CustomSnackbars";
import Header from "../Header";
import Footer from "../Footer";
import Loader from "../UI/loader";
// Style
const Main = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "82%",
  fontFamily: "Silkscreen",
  [theme.breakpoints.down("md")]: {
    margin: "0",
  },
}));

// Component
function Layout({ setSearchValue, children }) {
  const loading = useSelector((state) => state.loading);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (loading.status === "pending" || !loading.message) return;
    setIsOpen(true);

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <>
      {loading.status === "pending" && <Loader />}
      {loading.status !== "pending" && loading.message && (
        <CustomSnackbars
          message={loading.message}
          status={loading.status}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <Header setSearchValue={setSearchValue} />
      <Main bgcolor="whitesmoke" component="main">
        {children}
      </Main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  setSearchValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
