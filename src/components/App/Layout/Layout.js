// other import
import PropTypes from "prop-types";
// hook import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// component import
import CustomSnackbars from "../../UI/CustomSnackbars";
import Header from "../../Header";
import Footer from "../../Footer";
import Loader from "../../UI/loader";
import { Main } from "./style";

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
