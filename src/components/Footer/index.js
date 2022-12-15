// other import
import { Mail, LinkedIn, GitHub } from "@mui/icons-material";
// component import
import Typography from "@mui/material/Typography";
// styled component import
import {
  BrandContainer,
  BrandLink,
  BrandLogo,
  BrandText,
  FooterContainer,
  FooterLink,
  FooterNav,
  StyledDivider,
} from "./style";

// Component
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
    <FooterContainer>
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
    </FooterContainer>
  );
}

export default Footer;
