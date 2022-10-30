import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import { Mail, LinkedIn, GitHub, SportsBar } from "@mui/icons-material";

// Style
const FooterNav = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "auto",
  [theme.breakpoints.down("md")]: {
    borderBottom: "1px solid rgb(220, 220, 220)",
    width: "100%",
    marginLeft: "auto",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
const FooterLink = styled(Link)(({ theme }) => ({
  fontSize: "1.2rem",
  display: "flex",
  gap: ".5rem",
  cursor: "pointer",
  textDecoration: "none",
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(2),
  },
}));
const StyledDivider = styled(Divider)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const BrandContainer = styled(Box)({
  paddingTop: "1rem",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "start",
  alignItems: "center",
});
const BrandLink = styled(Box)({
  margin: "0.5rem 0.5rem 0.5rem 0",
  display: "flex",
  alignItems: "center",
  color: "#f2cc96",
  underline: "none",
});
const BrandLogo = styled(SportsBar)({
  verticalAlign: "end",
  fontSize: "2.8rem",
  color: "#f2cc96",
  marginRight: "0.4rem",
});
const BrandText = styled(Typography)({
  width: "50px",
  fontWeight: "700",
  fontSize: "1.1rem",
});

function Footer() {
  const content = {
    brand: "Bière de ta région.",
    copy: "© 2022 Bière de ta région. Tous droits réservés.",
    link1: { text: "Contact", link: "mailto:bacqueromain@orange.fr" },
    link2: {
      text: "Linkedin",
      link: "https://www.linkedin.com/in/romain-bacque/",
    },
    link3: { text: "Github", link: "https://github.com/Romain-Bacque" },
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "2rem",
        borderTop: "1px solid rgb(230, 230, 230)",
      }}
    >
      <FooterNav component="nav">
        <FooterLink
          href={content.link1.link}
          variant="body1"
          color="textPrimary"
        >
          <Mail />
          {content.link1.text}
        </FooterLink>
        <StyledDivider orientation="vertical" flexItem />
        <FooterLink
          href={content.link2.link}
          variant="body1"
          color="textPrimary"
        >
          <LinkedIn />
          {content.link2.text}
        </FooterLink>
        <StyledDivider orientation="vertical" flexItem />
        <FooterLink
          href={content.link3.link}
          variant="body1"
          color="textPrimary"
        >
          <GitHub />
          {content.link3.text}
        </FooterLink>
      </FooterNav>
      <BrandContainer>
        <BrandLink>
          <BrandLogo />
          <BrandText>{content.brand}</BrandText>
        </BrandLink>
        <Typography color="textSecondary" component="p" variant="p">
          {content.copy}
        </Typography>
      </BrandContainer>
    </Box>
  );
}

export default Footer;
