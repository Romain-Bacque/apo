// other import
import PropTypes from "prop-types";
import styled from "@emotion/styled";
// hook import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// component import
import { Box } from "@mui/material";
import CustomSnackbars from "../UI/CustomSnackbars";
import Header from "../Header";
import Footer from "../Footer";
import Loader from "../UI/loader";
// background image import
import barrel from "./barrels.jpg";

// Style
const Main = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 13rem)",
  background: "rgb(250, 250, 250, 0.93)",
  fontFamily: "Silkscreen",
  overflowY: "auto",
  "&::before": {
    content: '""',
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: `url(${barrel})center/cover no-repeat`,
    zIndex: -1,
  },
});

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
      <Main component="main">{children}</Main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  setSearchValue: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
