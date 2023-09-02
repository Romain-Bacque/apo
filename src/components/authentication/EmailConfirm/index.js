import { Typography } from "@mui/material";
import { StyledContainer } from "./style";
import Loader from "../../UI/loader";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { emailConfirm } from "../../../actions";

const EmailConfirm = () => {
  const { status } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const id = searchParams.get("id");
  const token = searchParams.get("t");

  useEffect(() => {
    if (id && token) dispatch(emailConfirm(id, token));
  }, [id, token]);

  if (status === "pending") {
    return <Loader />;
  }

  return (
    <StyledContainer component="section">
      <Typography component="h3" variant="h3">
        Validation du compte
      </Typography>
      <Typography variant="h6" paragraph>
        {status === "success"
          ? "Votre compte a été validé !"
          : "Votre compte n'a pas été validé !"}
      </Typography>
      {status === "success" && (
        <div className="nav-container">
          <Link to="/signin" class="nav-container__link">
            Se connecter
          </Link>
        </div>
      )}
    </StyledContainer>
  );
};

export default EmailConfirm;
