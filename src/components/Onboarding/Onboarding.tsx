"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  ButtonOnBoarding,
  ButtonTextOnBoarding,
  CommunityRow,
  Container,
  SupportButton
} from "./Onboarding-styles";
import Introduction from "./Introduction";
import {
  Box,
  Paper,
  Stack,
  Typography,
  MobileStepper,
  useTheme
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { InstallQortalHub, OS } from "./InstallQortalHub";
import { SetupQortalCore } from "./SetupQortalCore";
import { CreateNewAccount } from "./CreateNewAccount";
import { RegisterName } from "./RegisterName";
import { JoinGroup } from "./JoinGroup";
import { DynamicJoinGroup } from "./DynamicJoinGroup";
import ReceiveQort from "./ReceiveQort";
import ReceiveQort2 from "./ReceiveQort2";
import NextSteps from "./NextSteps";
import MailingList from "./MailingList";
import {
  HeadphonesIcon,
  SupportModalButton
} from "../Common/Modal/SupportModal-styles";
import Modal from "../Common/Modal/Modal";
import { groupApi } from "../../constants/endpoint";
import { fetchAPI } from "../../utils/fetchAPI";

type StepDefinition = {
  key: string;
  label: string;
  render: () => React.ReactNode;
  requiresFreedomCells?: boolean;
  requiresDynamicGroup?: boolean;
};

interface GroupInfo {
  groupId: number;
  owner: string;
  groupName: string;
  description: string;
  created: number;
  isOpen: boolean;
  approvalThreshold: string;
  minimumBlockDelay: number;
  maximumBlockDelay: number;
  memberCount: number;
}

const Onboarding = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const referral = searchParams?.get("ref")?.toLowerCase() ?? null;
  const groupIdParam = searchParams?.get("groupId") ?? null;
  const showFreedomCellsStep = referral === "freedomcells";
  const [os, setOS] = useState<OS>("windows");
  const [selectedOnBoardingScreenShot, setSelectedOnBoardingScreenShot] =
    useState<null | string>(null);
  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [isLoadingGroup, setIsLoadingGroup] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();

    if (ua.includes("mac")) {
      setOS("mac");
    } else if (ua.includes("win")) {
      setOS("windows");
    } else if (ua.includes("linux")) {
      setOS("linux");
    } else {
      setOS("windows");
    }
  }, []);

  // Fetch group info if groupId is provided
  useEffect(() => {
    const fetchGroupInfo = async () => {
      if (!groupIdParam) return;

      setIsLoadingGroup(true);
      try {
        const response = await fetchAPI(
          groupApi,
          `/groups/${groupIdParam}`,
          "GET"
        );
        setGroupInfo(response);
      } catch (error) {
        console.error("Failed to fetch group info:", error);
        setGroupInfo(null);
      } finally {
        setIsLoadingGroup(false);
      }
    };

    fetchGroupInfo();
  }, [groupIdParam]);

  const stepDefinitions = useMemo<StepDefinition[]>(
    () => [
      {
        key: "intro",
        label: "Qortal Onboarding",
        render: () => <Introduction />
      },
      {
        key: "install-hub",
        label: "Install Qortal Hub",
        render: () => (
          <InstallQortalHub
            osAuto={os}
            setSelectedOnBoardingScreenShot={setSelectedOnBoardingScreenShot}
          />
        )
      },
      {
        key: "setup-core",
        label: "Setup Qortal Core",
        render: () => (
          <SetupQortalCore
            osAuto={os}
            setSelectedOnBoardingScreenShot={setSelectedOnBoardingScreenShot}
          />
        )
      },
      {
        key: "create-account",
        label: "Create new Qortal account",
        render: () => (
          <CreateNewAccount
            setSelectedOnBoardingScreenShot={setSelectedOnBoardingScreenShot}
          />
        )
      },
      {
        key: "receive-two",
        label: "Redeem 2 QORT",
        render: () => (
          <ReceiveQort
            qortStep={1}
            setSelectedOnBoardingScreenShot={setSelectedOnBoardingScreenShot}
          />
        )
      },
      {
        key: "register-name",
        label: "Register a name",
        render: () => (
          <RegisterName
            setSelectedOnBoardingScreenShot={setSelectedOnBoardingScreenShot}
          />
        )
      },
      {
        key: "join-group",
        label: "Join 'The Freedom Cell Network' Group",
        render: () => (
          <JoinGroup
            setSelectedOnBoardingScreenShot={setSelectedOnBoardingScreenShot}
          />
        ),
        requiresFreedomCells: true
      },
      {
        key: "join-dynamic-group",
        label: groupInfo ? `Join '${groupInfo.groupName}' Group` : "Join Group",
        render: () =>
          groupInfo ? (
            <DynamicJoinGroup
              groupInfo={groupInfo}
              setSelectedOnBoardingScreenShot={setSelectedOnBoardingScreenShot}
            />
          ) : null,
        requiresDynamicGroup: true
      },
      {
        key: "receive-four",
        label: "Redeem 4 QORT",
        render: () => <ReceiveQort2 qortStep={2} />
      },
      {
        key: "mailing-list",
        label: "Mailing list",
        render: () => <MailingList />
      },
      {
        key: "next-steps",
        label: "Next steps",
        render: () => <NextSteps />
      }
    ],
    [os, groupInfo]
  );

  const steps = useMemo(
    () =>
      stepDefinitions.filter(
        (step) =>
          (showFreedomCellsStep || !step.requiresFreedomCells) &&
          (groupInfo || !step.requiresDynamicGroup)
      ),
    [stepDefinitions, showFreedomCellsStep, groupInfo]
  );

  useEffect(() => {
    const maxIndex = Math.max(steps.length - 1, 0);
    if (activeStep > maxIndex) {
      setActiveStep(maxIndex);
    }
  }, [activeStep, steps.length, setActiveStep]);

  // Scroll to top when step changes

  const handleNext = () => {
    // Scroll to top immediately before state change
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    // Scroll to top immediately before state change
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  if (steps.length === 0 || isLoadingGroup) return null;

  const currentStepIndex = Math.min(activeStep, steps.length - 1);
  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const isSecondToLast = currentStepIndex === steps.length - 2;

  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          width: "100%",
          "@media (min-width: 1194px)": {
            bgcolor:
              theme.palette.mode === "dark" ? "#020713" : "background.default"
          }
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: 800,
            width: "100%",
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4
          }}
        >
          {/* Right side – step content */}
          <Stack flex={1} spacing={3}>
            <CommunityRow>
              <Stack
                direction={"column"}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <Typography variant="overline" color="text.primary">
                  Step {currentStepIndex + 1} of {steps.length}
                </Typography>
                <Typography variant="h4" fontWeight={600}>
                  {currentStep?.label}
                </Typography>
              </Stack>
              <SupportButton
                role="button"
                tabIndex={0}
                aria-label="Chat with us"
                onClick={() =>
                  window.open("https://link.qortal.dev/support", "_blank")
                }
                onKeyDown={() =>
                  window.open("https://link.qortal.dev/support", "_blank")
                }
              >
                Support
              </SupportButton>
            </CommunityRow>

            <Box sx={{ flex: 1 }}>{currentStep?.render()}</Box>

            {/* Navigation */}
            <MobileStepper
              variant="dots"
              steps={steps.length}
              position="static"
              activeStep={currentStepIndex}
              nextButton={
                <ButtonOnBoarding
                  size="small"
                  onClick={handleNext}
                  disabled={isLastStep}
                  variant="contained"
                  sx={{
                    visibility: isLastStep ? "hidden" : "visible"
                  }}
                >
                  {isLastStep
                    ? "Finished"
                    : isSecondToLast
                      ? "Finish"
                      : "Continue"}
                </ButtonOnBoarding>
              }
              backButton={
                <ButtonTextOnBoarding
                  size="small"
                  onClick={handleBack}
                  sx={{
                    visibility: isFirstStep ? "hidden" : "visible"
                  }}
                  disabled={
                    currentStepIndex === 0 ||
                    currentStepIndex === steps.length - 1
                  }
                  variant="text"
                >
                  Back
                </ButtonTextOnBoarding>
              }
              sx={{
                bgcolor: "transparent",
                px: 0,
                "& .MuiMobileStepper-dotActive": {
                  bgcolor: theme.palette.primary.main
                }
              }}
            />
          </Stack>
        </Paper>
      </Box>
      {selectedOnBoardingScreenShot && (
        <Modal
          images={[selectedOnBoardingScreenShot]}
          openModal={!!selectedOnBoardingScreenShot}
          onClickFunc={() => {
            setSelectedOnBoardingScreenShot(null);
          }}
        ></Modal>
      )}
    </Container>
  );
};

export default Onboarding;
