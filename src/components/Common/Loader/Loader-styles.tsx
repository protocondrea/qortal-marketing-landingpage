import { Box, keyframes, styled } from "@mui/system";

interface LoadingProps {
  delay: number;
}

// Animation keyframes
const fadeIn = keyframes`
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  20%, 80% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const LoadingContainer = styled(Box)({
  display: "flex",
  gap: "8px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "min(360px, 60vh)",
  marginTop: 0
});

export const LoadingQortalLogo = styled(Box)<LoadingProps>(
  ({ delay }) => ({
    opacity: 0, // Start invisible
    animation: `${fadeIn} 4.5s ease infinite`,
    animationDelay: `${delay}s`,
  })
);
