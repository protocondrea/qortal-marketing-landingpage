"use client";
import { useMediaQuery } from "@mui/material";
import {
  FooterContainer,
  FooterInner,
  FooterLink,
  FooterRow
} from "./Footer-styles";
import { usePathname } from "next/navigation";
import { Socials } from "../../Common/Socials/Socials";

const footerLinks = [
  { href: "/support", label: "Support" },
  { href: "/creators", label: "For Creators" },
  { href: "/devs", label: "For Developers" },
  { href: "/donate", label: "Donate" },
  { href: "/links", label: "Links" },
  { href: "/privacy", label: "Privacy Policy" }
];

export const Footer = () => {
  const location = usePathname();
  const isMobile = useMediaQuery("(max-width: 1086px)");
  const isFooterSuppressedRoute =
    location.includes("/links") ||
    location.includes("/other-web3") ||
    location.includes("/webinar") ||
    location.includes("/onboarding");

  if ((location.includes("/wiki") && isMobile) || (isMobile && isFooterSuppressedRoute)) {
    return null;
  } else
    return (
      <FooterContainer
        component="footer"
        className="site-footer"
      >
        <FooterInner
          className="site-footer-inner"
          sx={{
            pb: location === "/" ? "40px" : 0,
            "@media (min-width: 1194px)": {
              pb: "40px"
            }
          }}
        >
          <Socials />
          <FooterRow>
            {footerLinks.map(({ href, label }) => (
              <FooterLink
                key={href}
                href={href}
                className={location === href ? "active" : ""}
              >
                {label}
              </FooterLink>
            ))}
          </FooterRow>
        </FooterInner>
      </FooterContainer>
    );
};
