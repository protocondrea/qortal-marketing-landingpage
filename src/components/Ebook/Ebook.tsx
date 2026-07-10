"use client";
import React, { useState } from "react";
import {
  BookImage,
  BookSectionContainer,
  Container,
  ContentCol,
  CTABox,
  CTABoxButton,
  CTABoxTextFieldContainer,
  CTABoxTitle,
  CTADescription,
  CTASubTitle,
  CTATitle,
  EbookInputField,
  EbookTooltip,
  IconBlock,
  IconImg,
  IconRow,
  IconText,
  InfoIcon,
  InfoIconContainer,
  MainCol,
  SectionTitle,
  StyledTextarea,
  SurveyText,
  SurveyTitle
} from "./Ebook-styles";
import { Tooltip, useTheme } from "@mui/material";
import { downloadEbook, submitBlurb } from "../../utils/ebookApiController";
import { useDispatch } from "react-redux";
import { setNotification } from "../../state/features/notificationsSlice";

const Ebook = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [surveyResponse, setSurveyResponse] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [surveyResponseError, setSurveyResponseError] =
    useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [downloadedBook, setDownloadedBook] = useState<boolean>(false);

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value as string);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSurveyResponseChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSurveyResponse(event.target.value);
  };

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
    if (emailTouched) {
      setEmailError(!validateEmail(event.target.value));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(!validateEmail(email));
  };

  const handleDownloadEbook = async () => {
    try {
      const res = await downloadEbook(name, email);
      if (res) {
        setDownloadedBook(true);
        dispatch(
          setNotification({
            msg: "Success! The Ebook Was Sent To Your Email!",
            alertType: "success"
          })
        );
      } else {
        dispatch(
          setNotification({
            msg: "Error in downloading the Ebook! Please, try again!",
            alertType: "error"
          })
        );
      }
    } catch (error: any) {
      dispatch(
        setNotification({
          msg: error,
          alertType: "error"
        })
      );
    }
  };
  // Function to handle the download button click
  const handleDownloadClick = async () => {
    const isEmailValid = validateEmail(email);
    setEmailError(!isEmailValid);
    const isNameValid = name.trim() !== "";
    setNameError(!isNameValid);

    if (isEmailValid && isNameValid) {
      await handleDownloadEbook();
    }
  };

  const handleSubmitBlurb = async (): Promise<boolean> => {
    try {
      const res = await submitBlurb(email, surveyResponse);
      if (!res) return false;
      return true;
    } catch (error) {
      console.error("[handleSubmitBlurb] :", error);
      return false;
    }
  };
  // Function to handle sending the survey response
  const handleSurveyResponse = async () => {
    const isResponseValid = surveyResponse.trim() !== "";
    setSurveyResponseError(!isResponseValid);
    if (isResponseValid) {
      const res = await handleSubmitBlurb();
      if (res) {
        dispatch(
          setNotification({
            msg: "Questionnaire response submitted successfully!",
            alertType: "success"
          })
        );
        setSurveyResponse("");
        setName("");
        setEmail("");
        setDownloadedBook(false);
      } else {
        dispatch(
          setNotification({
            msg: "Error in submitting the questionnaire response! Please, try again!",
            alertType: "error"
          })
        );
      }
    }
  };

  return (
    <>
      <Container>
        <MainCol>
          <CTASubTitle>FREE EBOOK</CTASubTitle>
          <CTATitle>
            UNLOCK THE WORLD OF{" "}
            <span style={{ color: theme.palette.customBlue.main }}>QORTAL</span>
          </CTATitle>
          <CTADescription>
            Your Simple Guide to Understanding Decentralized Freedom
          </CTADescription>
        </MainCol>
        <MainCol>
          <CTABox>
            {!downloadedBook ? (
              <>
                <EbookTooltip
                  title="By downloading this ebook, you agree to receive emails from the Qortal community. You can unsubscribe at any time from the mailing list at any time by clicking the unsubscribe link at the bottom of the email."
                  placement="top"
                  open={showTooltip}
                  onClose={() => setShowTooltip(false)}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  onBlur={() => setShowTooltip(false)}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -5]
                          }
                        }
                      ]
                    }
                  }}
                >
                  <InfoIconContainer
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <InfoIcon
                      color={theme.palette.text.primary}
                      width={"14"}
                      height={"14"}
                    />
                  </InfoIconContainer>
                </EbookTooltip>
                <CTABoxTitle>Get Your Free Copy</CTABoxTitle>
                <CTABoxTextFieldContainer>
                  <EbookInputField
                    name="name"
                    aria-label="name"
                    label="Name"
                    variant="filled"
                    value={name}
                    onChange={handleNameInputChange}
                    required
                    error={nameError}
                    helperText={nameError ? "Please enter your name." : ""}
                  />
                  <EbookInputField
                    name="email"
                    label="E-Mail address"
                    variant="filled"
                    value={email}
                    onChange={handleEmailInputChange}
                    onBlur={handleEmailBlur}
                    required
                    error={emailError}
                    helperText={
                      emailError ? "Please enter a valid email address." : ""
                    }
                  />
                </CTABoxTextFieldContainer>
                <CTABoxButton onClick={handleDownloadClick}>
                  Download Free Ebook
                </CTABoxButton>
              </>
            ) : (
              <>
                <EbookTooltip
                  title="By submitting this answer, you give Qortal permission to use your reply in future marketing materials or for other purposes. Your name and email will not be shared with any third parties."
                  placement="top"
                  open={showTooltip}
                  onClose={() => setShowTooltip(false)}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  onBlur={() => setShowTooltip(false)}
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -5]
                          }
                        }
                      ]
                    }
                  }}
                >
                  <InfoIconContainer
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <InfoIcon
                      color={theme.palette.text.primary}
                      width={"14"}
                      height={"14"}
                    />
                  </InfoIconContainer>
                </EbookTooltip>
                <SurveyText>
                  <SurveyTitle>
                    Thank you for downloading the ebook! Check your email for
                    the download link.
                  </SurveyTitle>
                  <SurveyTitle>
                    Please help the Qortal community by answering this short
                    survey question: Why does decentralization and a
                    censorship-free internet matter to you?
                  </SurveyTitle>
                </SurveyText>
                <StyledTextarea
                  fullWidth
                  multiline
                  placeholder="Type your answer here..."
                  variant="outlined"
                  minRows={8}
                  maxRows={12}
                  value={surveyResponse}
                  onChange={handleSurveyResponseChange}
                  error={surveyResponseError}
                  helperText={
                    surveyResponseError ? "Please enter your answer." : ""
                  }
                />
                <CTABoxButton onClick={handleSurveyResponse}>
                  Send Answer
                </CTABoxButton>
              </>
            )}
          </CTABox>
        </MainCol>
      </Container>
      <BookSectionContainer>
        <BookImage
          src="/images/Ebook/Ebook Design.png"
          alt="Understanding Qortal Book"
        />

        <ContentCol>
          <SectionTitle>
            This Ebook covers many important concepts related to blockchain
            technology and Qortal, including how:
          </SectionTitle>

          <IconRow>
            <IconBlock>
              <IconImg
                src={"/images/Ebook/LockShield.png"}
                alt=""
                width={500}
                height={500}
                quality={100}
              />
              <IconText>
                Qortal gives users true privacy and digital freedom by
                eliminating corporate surveillance, middlemen, and censorship,
                forever!
              </IconText>
            </IconBlock>

            <IconBlock>
              <IconImg
                src={"/images/Ebook/DecentralizedInternet.png"}
                alt=""
                width={500}
                height={500}
                quality={100}
              />
              <IconText>
                Qortal’s blockchain network replaces centralized services with
                peer-to-peer apps for video, commerce, crowdfunding, and many
                more industries which are broken on the normal internet.
              </IconText>
            </IconBlock>

            <IconBlock>
              <IconImg
                src={"/images/Ebook/CoinStack.png"}
                alt=""
                width={500}
                height={500}
                quality={100}
              />
              <IconText>
                Qortal's coin QORT powers a sustainable, creator-first economy
                without middlemen, fees, or any centralized banking.
              </IconText>
            </IconBlock>
          </IconRow>
        </ContentCol>
      </BookSectionContainer>
    </>
  );
};

export default Ebook;
