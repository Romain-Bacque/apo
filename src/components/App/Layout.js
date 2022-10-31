import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSnackbars from "../UI/CustomSnackbars";
import Header from "../Header";
import Footer from "../Footer";

// Style
const Main = styled(Box)(({ theme }) => ({
  height: "100%",
  margin: "2rem",
  fontFamily: "Silkscreen",
  [theme.breakpoints.down("md")]: {
    margin: "0",
  },
}));

const Layout = (props) => {
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
      {loading.status !== "pending" && loading.message && (
        <CustomSnackbars
          message={loading.message}
          status={loading.status}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <Header setSearchValue={props.setSearchValue} />
      <Main component="main">{props.children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
