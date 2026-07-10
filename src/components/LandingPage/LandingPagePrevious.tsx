"use client";
import { useEffect, useRef, useState } from "react";
import ReactGA from "react-ga4";
import {
  CTAButton1,
  CTAButton2,
  Container,
  Header,
  QortalFeaturesSection,
  SubHeader,
  SubHeaderBox,
  SubHeaderBoxImage,
  TopCard1,
  TopCard2,
  TopCard3,
  TopCardImage,
  TopCardSubContainer,
  TopCardSubTitle,
  TopCardTitle,
  TopFold,
  TopFoldButtonRow,
  TopFoldCol,
  TopFoldRow,
  TopFoldWordCol,
  TopCardRow,
  VideoBox,
  TopOfPageRef,
  MiddleOfPageRef,
  TopCard4,
  GroupSection,
  SectionCol,
  GroupSectionImgBox,
  SectionImg,
  SectionHeader,
  SectionHeaderCol,
  SectionHeaderSubtitle,
  SectionHeaderTitle,
  SectionLinesImg,
  SectionDescriptionCol,
  SectionDescriptionTitle,
  SectionDescription,
  GroupSectionImgBox2,
  QAppsSection,
  QAppsSectionImgBox,
  SectionDownloadLink,
  QAppsLogosRow,
  QAppsLogo,
  QAppsSectionRow,
  QTradeSection,
  QTradeSectionImgBox,
  OpenSourceSection,
  OpenSourceSectionImgBox,
  OpenSourceBox,
  OpenSourceImg,
  FinalText,
  GroupEncryptedHeader,
  QMailDescriptionCol,
  QMailDescriptionCol as QChatDescriptionCol,
  QTradeDescriptionCol,
  QORTDescriptionCol,
  OpenSourceDescriptionCol,
  TopCardLockIcon,
  TopCardSubContainerCrypto,
  QAppsDescriptionCol,
  RightArrow,
  RadioButtons,
  TopFoldMainCol,
  SectionHeaderMobile,
  SectionMobileRow,
  SectionMobileHeader,
  QChatSectionCol,
  QTradeSectionCol,
  QonnectFourMobileCol,
  FinalTextContainer,
  OpenSourceMobileSection,
  EbookPromoTitle,
  EbookPromoSubTitle,
  EbookPromoContainer,
  EbookPromoButton,
  EbookPromoTextCol,
  InfoRow,
  SubHeader2,
  IconRow,
  IconImg,
  SubHeader3,
  ArrowDownIcon,
  SectionTitle,
  SubHeaderRow
} from "../../components/LandingPage/LandingPage-styles";
import { YoutubeVideoContainer } from "../Qort/QORTPage-styles";
import { YoutubePlaceholder } from "../YouTube/YoutubePlaceholder";
import { useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import Modal from "../Common/Modal/Modal";
import { ScrollToTopButton, TopArrow } from "../Wiki/Wiki-styles";
import { CommonModal } from "../Common/CommonModal/CommonModal";
import { DownloadSVG } from "../Common/Icons/DownloadSVG";
import { BookSVG } from "../Common/Icons/BookSVG";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const topCard1Feature = useRef<HTMLDivElement | null>(null);
  const topCard2Feature = useRef<HTMLDivElement | null>(null);
  const topCard3Feature = useRef<HTMLDivElement | null>(null);
  const topCard4Feature = useRef<HTMLDivElement | null>(null);
  const topOfPageRef = useRef<HTMLDivElement | null>(null);
  const middleOfPageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [showButton, setShowButton] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [activeCard, setActiveCard] = useState(0);
  const [firstTimeVisitor, setFirstTimeVisitor] = useState<boolean>(false);

  // Display download ebook modal for first time visitors
  useEffect(() => {
    const isFirstTimeVisitor = localStorage.getItem("isFirstTimeVisitor");

    if (!isFirstTimeVisitor) {
      setTimeout(() => {
        // Perform actions for first-time visitors
        setFirstTimeVisitor(true);
        // Set the flag in localStorage
        localStorage.setItem("isFirstTimeVisitor", "false");
      }, 30000);
    } else {
      return;
    }
  }, []);

  const scrollToTopCard1Feature = () => {
    if (topCard1Feature?.current) {
      topCard1Feature?.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  };

  const scrollToTopCard2Feature = () => {
    if (topCard2Feature?.current) {
      topCard2Feature?.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  };

  const scrollToTopCard3Feature = () => {
    if (topCard3Feature?.current) {
      topCard3Feature?.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  };

  const handleVideoClick = () => {
    setShowVideoPlayer((prevState) => !prevState);
  };

  // Intersection observer to show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (!middleOfPageRef.current) return;
      const rect = middleOfPageRef.current?.getBoundingClientRect();
      const isScrolledPast = rect && rect.top < 0; // Element is above the viewport
      const notAtTop = window.scrollY > 0; // User is not at the top of the page

      // Show button only if the user has scrolled past the element and is not at the top
      setShowButton(isScrolledPast && notAtTop);
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Run on mount to initialize state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (topOfPageRef.current) {
      topOfPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardRefs.findIndex(
            (ref) => ref.current === entry.target
          );
          setActiveCard(index);
        }
      });
    }, observerOptions);

    cardRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      cardRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [cardRefs]);

  return (
    <Container>
      <TopOfPageRef ref={topOfPageRef} />

      <TopFoldCol>
        <TopFoldRow>
          <Header>
            A BRAND{" "}
            <span style={{ color: theme.palette.customBlue.main }}>
              NEW INTERNET
            </span>{" "}
            WHERE YOU CANNOT BE CENSORED!
          </Header>
        </TopFoldRow>
        <TopFoldRow>
          <SubHeader>
            No AWS. No Google. No kill switch. Your content, your data, yours
            forever. <strong>Up and running in under 5 minutes.</strong>
          </SubHeader>
        </TopFoldRow>
        <InfoRow>
          <SubHeader2>500+ apps already deployed on Qortal!</SubHeader2>
          <IconRow>
            <IconImg
              src={"/images/LandingPage/Q-Tube Avatar.png"}
              alt="Qortal Q-Apps Q-Tube Icon"
              width={30}
              height={30}
              quality={100}
            />
            <IconImg
              src={"/images/LandingPage/Q-Share Avatar.png"}
              alt="Qortal Q-Apps Q-Share Icon"
              width={30}
              height={30}
              quality={100}
            />
            <IconImg
              src={"/images/LandingPage/Q-Mail Avatar.png"}
              alt="Qortal Q-Apps Q-Mail Icon"
              width={30}
              height={30}
              quality={100}
            />
          </IconRow>
        </InfoRow>
        <TopFoldButtonRow>
          <CTAButton1
            onClick={() => {
              ReactGA.event({
                category: "User",
                action: "Clicked Learn why Button",
                label: "Learn why Button"
              });
              scrollToTopCard1Feature();
            }}
          >
            LEARN WHY
          </CTAButton1>
          <CTAButton2
            onClick={() => {
              ReactGA.set({ dimension1: "Landing Page Download Button" }); // Event-level dimension
              ReactGA.event({
                category: "User",
                action: "Clicked Main Download CTA Button",
                label: "Clicked Main Download CTA Button"
              });
              router.push("/downloads");
            }}
          >
            DOWNLOAD
          </CTAButton2>
        </TopFoldButtonRow>
      </TopFoldCol>

      <TopFoldMainCol>
        <SubHeaderRow>
          <SubHeader3>
            The only Web3 platform with these features already LIVE{" "}
          </SubHeader3>
          <ArrowDownIcon
            color={theme.palette.text.primary}
            width={isMobile ? "28" : "30"}
            height={isMobile ? "28" : "30"}
          />
        </SubHeaderRow>
        <TopCardRow>
          <TopCard1
            ref={cardRefs[0]}
            role="button"
            aria-label="Group-Encrypted Chats - COMMUNICATION"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToTopCard1Feature();
              }
            }}
            onClick={() => {
              scrollToTopCard1Feature();
            }}
          >
            <TopCardSubContainer>
              <TopCardTitle>COMMUNICATION</TopCardTitle>
              <TopCardSubTitle>Group-Encrypted Chats</TopCardSubTitle>
            </TopCardSubContainer>
            <TopCardImage
              src={"/images/LandingPage/Q-Chat.png"}
              alt="Qortal Group Encrypted Chat Screenshot"
              width={1920}
              height={1080}
              quality={100}
            />
          </TopCard1>
          <TopCard2
            ref={cardRefs[1]}
            role="button"
            aria-label="Qortal Q-Apps - APPS YOU CAN USE TODAY"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToTopCard2Feature();
              }
            }}
            onClick={() => {
              scrollToTopCard2Feature();
            }}
          >
            <TopCardSubContainer>
              <TopCardTitle>APPS YOU CAN USE TODAY</TopCardTitle>
              <TopCardSubTitle>Q-Apps</TopCardSubTitle>
            </TopCardSubContainer>
            <TopCardImage
              src={"/images/LandingPage/Q-Tube Video Screenshot.png"}
              alt="Qortal Q-Apps Screenshot"
              width={1920}
              height={1080}
              quality={100}
            />
          </TopCard2>
          <TopCard3
            ref={cardRefs[2]}
            role="button"
            aria-label="Trading DEX Platform and QORT - CRYPTO"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToTopCard3Feature();
              }
            }}
            onClick={() => {
              scrollToTopCard3Feature();
            }}
          >
            <TopCardSubContainerCrypto>
              <TopCardTitle>CRYPTO</TopCardTitle>
              <TopCardSubTitle>Trading DEX Platform & QORT</TopCardSubTitle>
            </TopCardSubContainerCrypto>
            <TopCardImage
              src={"/images/LandingPage/Q-Trade.png"}
              alt="Qortal Q-Trade Screenshot"
              width={1920}
              height={1080}
              quality={100}
            />
          </TopCard3>
        </TopCardRow>
        <RadioButtons>
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              type="radio"
              name="topCard"
              checked={activeCard === index}
              readOnly
              aria-label={`Card ${index + 1}`}
            />
          ))}
        </RadioButtons>
      </TopFoldMainCol>
      <VideoBox>
        <YoutubeVideoContainer>
          {showVideoPlayer ? (
            <iframe
              src="https://www.youtube.com/embed/pWyB8tNZZ40?si=hRHI1Q25ab5M2AA7&autoplay=1&rel=0"
              loading="lazy"
              title="The internet is dying"
              allowFullScreen
              allow="autoplay"
            ></iframe>
          ) : (
            <YoutubePlaceholder
              className="landing-page-video"
              isModal={false}
              onClick={handleVideoClick}
              YoutubeThumbnail={
                "/images/Youtube/The internet is dying thumbnail.png"
              }
              YoutubeTitle="The internet is dying"
            />
          )}
        </YoutubeVideoContainer>
      </VideoBox>
      <QortalFeaturesSection>
        <MiddleOfPageRef ref={middleOfPageRef} />

        {/* Groups Section */}

        <GroupSection ref={topCard1Feature}>
          <SectionTitle>
            With one download, you can access a brand new peer-to-peer internet
            where censorship is impossible.
          </SectionTitle>
          <SectionCol style={{ alignItems: "flex-start" }}>
            <SectionMobileHeader>Q-Mail</SectionMobileHeader>
            <GroupSectionImgBox>
              <SectionImg
                src={
                  isMobile
                    ? "/images/LandingPage/QMailScreenshotMobile.webp"
                    : "/images/LandingPage/Q-AppsLibrary.png"
                }
                alt={
                  isMobile
                    ? "Qortal Q-Mail Screenshot"
                    : "Qortal Q-Apps Library Screenshot"
                }
                width={1920}
                height={1080}
                quality={100}
                onClick={() => {
                  if (isMobile) return;
                  setOpenModal(true);
                  setSelectedImage("/images/LandingPage/Q-AppsLibrary.png");
                }}
              />
            </GroupSectionImgBox>
            <SectionHeader>
              <SectionLinesImg
                src={"/images/LandingPage/GreenLines.png"}
                alt=""
                width={40}
                height={63}
                quality={100}
              />
              <SectionHeaderCol>
                <SectionHeaderSubtitle>EASE OF USE</SectionHeaderSubtitle>
                <SectionHeaderTitle>
                  What makes Qortal so easy to get into?
                </SectionHeaderTitle>
              </SectionHeaderCol>
            </SectionHeader>
            <QMailDescriptionCol>
              <SectionDescriptionTitle>
                Account Creation In Minutes
              </SectionDescriptionTitle>
              <SectionDescription>
                With other Web3 projects, you get lost in complicated setups,
                seed phrases, and 3rd party wallets. Qortal makes it easy to get
                started with just an encrypted file and a password. No email, no
                phone number, no KYC, no hassle.
              </SectionDescription>
            </QMailDescriptionCol>
          </SectionCol>
          <QChatSectionCol>
            <GroupEncryptedHeader>
              <SectionLinesImg
                src={"/images/LandingPage/GreenLines.png"}
                alt=""
                width={40}
                height={63}
                quality={100}
              />
              <SectionHeaderCol>
                <SectionHeaderSubtitle>UNIQUENESS</SectionHeaderSubtitle>
                <SectionHeaderTitle>
                  What makes Qortal the best blockchain right now?
                </SectionHeaderTitle>
              </SectionHeaderCol>
            </GroupEncryptedHeader>
            <QChatDescriptionCol>
              <SectionDescriptionTitle>
                Truly Decentralized
              </SectionDescriptionTitle>
              <SectionDescription>
                While other Web3 projects claim they are completely
                decentralized, they are not. Qortal is decentralized from bottom
                up, from running your own node, to building apps, nobody can
                censor or take down any data. And it's all possible with a
                single download!
              </SectionDescription>
              <SectionDownloadLink
                href="/downloads"
                onClick={() => {
                  ReactGA.set({ dimension1: "Landing Page Download Button" }); // Event-level dimension
                  ReactGA.event({
                    category: "User",
                    action: "Clicked Download Group Section Button",
                    label: "Clicked Download Group Section Button"
                  });
                }}
              >
                Download{" "}
                <RightArrow
                  height={"20"}
                  width="20"
                  color={
                    theme.palette.mode === "dark"
                      ? "#02cbe6"
                      : theme.palette.customBlue.main
                  }
                />
              </SectionDownloadLink>
            </QChatDescriptionCol>
            <GroupSectionImgBox2>
              <SectionImg
                src={
                  isMobile
                    ? "/images/LandingPage/Q-ChatScreenshotMobile.webp"
                    : "/images/LandingPage/LoginPage.png"
                }
                alt={
                  isMobile
                    ? "Qortal Group Encrypted Chat Screenshot"
                    : "Qortal Q-Mail Screenshot"
                }
                width={1920}
                height={1080}
                quality={100}
                onClick={() => {
                  if (isMobile) return;
                  setOpenModal(true);
                  setSelectedImage("/images/LandingPage/LoginPage.png");
                }}
              />
            </GroupSectionImgBox2>
            <SectionMobileHeader>Q-Chat</SectionMobileHeader>
            <SectionHeaderMobile>
              <SectionHeaderCol>
                <SectionMobileRow>
                  <SectionHeaderSubtitle>COMMUNICATION</SectionHeaderSubtitle>
                  <SectionLinesImg
                    src={"/images/LandingPage/GreenStripesMobile.png"}
                    alt=""
                    width={217}
                    height={10}
                    quality={100}
                  />
                </SectionMobileRow>
                <SectionHeaderTitle>Group-Encrypted Chats</SectionHeaderTitle>
              </SectionHeaderCol>
            </SectionHeaderMobile>
          </QChatSectionCol>
        </GroupSection>

        {/* Q-Apps Section */}

        <QAppsSection ref={topCard2Feature}>
          <SectionHeaderMobile>
            <SectionHeaderCol>
              <SectionHeaderSubtitle>
                APPS YOU CAN USE TODAY
              </SectionHeaderSubtitle>
              <SectionLinesImg
                src={"/images/LandingPage/BlueStripesMobile.png"}
                alt=""
                width={174}
                height={4}
                quality={100}
              />
            </SectionHeaderCol>
          </SectionHeaderMobile>
          <QAppsSectionRow>
            <SectionMobileHeader>Q-Apps</SectionMobileHeader>
            <SectionCol>
              <QAppsSectionImgBox>
                <SectionImg
                  src={
                    isMobile
                      ? "/images/LandingPage/QAppsScreenshotMobile.webp"
                      : "/images/LandingPage/Q-Tube Video Screenshot.png"
                  }
                  alt="Qortal Q-Apps Screenshot"
                  width={isMobile ? 440 : 1920}
                  height={isMobile ? 214 : 1080}
                  quality={100}
                  onClick={() => {
                    if (isMobile) return;
                    setOpenModal(true);
                    setSelectedImage(
                      "/images/LandingPage/Q-Tube Video Screenshot.png"
                    );
                  }}
                />
              </QAppsSectionImgBox>
            </SectionCol>
            <SectionCol style={{ alignItems: "flex-start" }}>
              <SectionHeader>
                <SectionLinesImg
                  src={"/images/LandingPage/BlueLines.png"}
                  alt=""
                  width={40}
                  height={63}
                  quality={100}
                />
                <SectionHeaderCol>
                  <SectionHeaderSubtitle>
                    APPS YOU CAN USE TODAY
                  </SectionHeaderSubtitle>
                  <SectionHeaderTitle>Q-Apps</SectionHeaderTitle>
                </SectionHeaderCol>
              </SectionHeader>
              <QAppsDescriptionCol>
                <SectionDescription>
                  Build, share, and run apps directly on the{" "}
                  <span style={{ fontWeight: "bold" }}>Qortal blockchain</span>.
                  Whether it’s tools, videos, or new ideas, Q-Apps lets you go
                  decentralized, with just a touch of JavaScript know-how. From
                  social media to apps to video-sharing apps, the possibilities
                  are endless!
                </SectionDescription>
                <SectionDownloadLink
                  href="/downloads"
                  onClick={() => {
                    ReactGA.set({ dimension1: "Landing Page Download Button" }); // Event-level dimension
                    ReactGA.event({
                      category: "User",
                      action: "Clicked Download Q-Apps Button",
                      label: "Clicked Download Q-Apps Button"
                    });
                  }}
                >
                  Download{" "}
                  <RightArrow
                    height={"20"}
                    width="20"
                    color={
                      theme.palette.mode === "dark"
                        ? "#02cbe6"
                        : theme.palette.customBlue.main
                    }
                  />
                </SectionDownloadLink>
              </QAppsDescriptionCol>
            </SectionCol>
          </QAppsSectionRow>
          <QAppsLogosRow>
            <QAppsLogo
              style={{ display: isMobile ? "none" : "block" }}
              src={
                theme.palette.mode === "dark"
                  ? "/images/LandingPage/Q-TradeDark.png"
                  : "/images/LandingPage/Q-TradeLight.png"
              }
              alt="Q-Trade Logo"
              width={272}
              height={80}
              quality={100}
            />
            <QAppsLogo
              style={{ opacity: isMobile ? "0.5" : "1" }}
              src={
                theme.palette.mode === "dark"
                  ? "/images/LandingPage/Q-AppsLibraryDark.png"
                  : "/images/LandingPage/Q-AppsLibraryLight.png"
              }
              alt="Q-Apps Library Logo"
              width={272}
              height={80}
              quality={100}
            />
            <QAppsLogo
              style={{ display: isMobile ? "none" : "block" }}
              src={
                theme.palette.mode === "dark"
                  ? "/images/LandingPage/Q-TubeDark.png"
                  : "/images/LandingPage/Q-TubeLight.png"
              }
              alt="Q-Tube Logo"
              width={272}
              height={80}
              quality={100}
            />
          </QAppsLogosRow>
        </QAppsSection>

        {/* Q-Trade Section */}

        <QTradeSection ref={topCard3Feature}>
          <QTradeSectionCol>
            <SectionHeader>
              <SectionLinesImg
                src={"/images/LandingPage/YellowLines.png"}
                alt=""
                width={40}
                height={63}
                quality={100}
              />
              <SectionHeaderCol>
                <SectionHeaderSubtitle>CRYPTO</SectionHeaderSubtitle>
                <SectionHeaderTitle>Trading DEX Platform</SectionHeaderTitle>
              </SectionHeaderCol>
            </SectionHeader>
            {isMobile ? (
              <QORTDescriptionCol>
                <SectionDescriptionTitle>QORT</SectionDescriptionTitle>
                <SectionDescription>
                  Fuel the Qortal ecosystem with QORT! Use it to trade, tip,
                  donate, and even bet in games. It’s more than a coin; it’s
                  your key to a decentralized world.
                </SectionDescription>
                <SectionDownloadLink href="/downloads">
                  Learn more{" "}
                  <RightArrow
                    height={"20"}
                    width="20"
                    color={
                      theme.palette.mode === "dark"
                        ? "#02cbe6"
                        : theme.palette.customBlue.main
                    }
                  />
                </SectionDownloadLink>
              </QORTDescriptionCol>
            ) : (
              <QTradeDescriptionCol>
                <SectionDescriptionTitle>Q-Trade</SectionDescriptionTitle>
                <SectionDescription>
                  Trade crypto the Qortal way—peer-to-peer, secure, and no
                  middlemen. Swap QORT and other supported coins directly on our
                  decentralized trading DEX platform.
                </SectionDescription>
              </QTradeDescriptionCol>
            )}
          </QTradeSectionCol>
          <SectionCol style={{ alignItems: "flex-start" }}>
            <SectionMobileHeader>Trading DEX Platform</SectionMobileHeader>
            <QTradeSectionImgBox>
              <SectionImg
                src={
                  isMobile
                    ? "/images/LandingPage/Q-TradeScreenshotMobile.webp"
                    : "/images/LandingPage/Q-TradeScreenshot.webp"
                }
                alt="Qortal Q-Trade Screenshot"
                width={1920}
                height={1080}
                quality={100}
                onClick={() => {
                  if (isMobile) return;
                  setOpenModal(true);
                  setSelectedImage(
                    "/images/LandingPage/Q-TradeScreenshot.webp"
                  );
                }}
              />
            </QTradeSectionImgBox>
          </SectionCol>
          <SectionHeaderMobile>
            <SectionHeaderCol>
              <SectionMobileRow>
                <SectionHeaderSubtitle>CRYPTO</SectionHeaderSubtitle>
                <SectionLinesImg
                  src={"/images/LandingPage/YellowStripesMobile.png"}
                  alt=""
                  width={217}
                  height={10}
                  quality={100}
                />
              </SectionMobileRow>
              <SectionHeaderTitle>Trading & Currency</SectionHeaderTitle>
            </SectionHeaderCol>
          </SectionHeaderMobile>
        </QTradeSection>

        {/* Open Source Section */}

        <OpenSourceSection ref={topCard4Feature}>
          <SectionCol>
            <SectionHeaderMobile>
              <SectionHeaderCol>
                <SectionHeaderSubtitle>FULL TRANSPARENCY</SectionHeaderSubtitle>
                <SectionLinesImg
                  src={"/images/LandingPage/RedStripesMobile.png"}
                  alt=""
                  width={141}
                  height={4}
                  quality={100}
                />
              </SectionHeaderCol>
            </SectionHeaderMobile>
            <SectionMobileHeader>Open Source</SectionMobileHeader>
            <OpenSourceSectionImgBox>
              <OpenSourceBox tabIndex={0} aria-label="Open Source Codebase">
                <SectionCol>
                  <SectionHeader>
                    <SectionLinesImg
                      src={"/images/LandingPage/RedLines.png"}
                      alt=""
                      width={40}
                      height={63}
                      quality={100}
                    />
                    <SectionHeaderCol>
                      <SectionHeaderSubtitle style={{ color: "#ffffff" }}>
                        FULL TRANSPARENCY
                      </SectionHeaderSubtitle>
                      <SectionHeaderTitle style={{ color: "#ffffff" }}>
                        Open Source
                      </SectionHeaderTitle>
                    </SectionHeaderCol>
                  </SectionHeader>
                  <OpenSourceDescriptionCol>
                    <SectionDescription style={{ color: "#ffffff" }}>
                      Built on open-source code, Qortal ensures full
                      transparency. No secrets, no hidden agendas. Just a
                      blockchain you can trust.
                    </SectionDescription>
                    <SectionDownloadLink
                      href="https://github.com/Qortal"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub{" "}
                      <RightArrow
                        height={"20"}
                        width="20"
                        color={
                          theme.palette.mode === "dark"
                            ? "#02cbe6"
                            : theme.palette.customBlue.main
                        }
                      />
                    </SectionDownloadLink>
                  </OpenSourceDescriptionCol>
                </SectionCol>
              </OpenSourceBox>
            </OpenSourceSectionImgBox>
            <OpenSourceMobileSection>
              <OpenSourceDescriptionCol>
                <SectionDescription style={{ color: "#ffffff" }}>
                  Built on open-source code, Qortal ensures full transparency.
                  No secrets, no hidden agendas. Just a blockchain you can
                  trust.
                </SectionDescription>
                <SectionDownloadLink
                  href="https://github.com/Qortal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub{" "}
                  <RightArrow
                    height={"20"}
                    width="20"
                    color={
                      theme.palette.mode === "dark"
                        ? "#02cbe6"
                        : theme.palette.customBlue.main
                    }
                  />
                </SectionDownloadLink>
              </OpenSourceDescriptionCol>
            </OpenSourceMobileSection>
            <FinalTextContainer>
              <FinalText>
                Experience the future of decentralization with Qortal, where the
                power of WEB3 meets the convenience of WEB2
              </FinalText>
            </FinalTextContainer>
          </SectionCol>
        </OpenSourceSection>
      </QortalFeaturesSection>
      {showButton && (
        <ScrollToTopButton onClick={scrollToTop}>
          <TopArrow
            color={theme.palette.text.primary}
            height={"25"}
            width={"25"}
          />
        </ScrollToTopButton>
      )}
      {openModal && (
        <Modal
          images={[selectedImage]}
          openModal={openModal}
          onClickFunc={() => {
            setOpenModal(false);
            setSelectedImage("");
          }}
        ></Modal>
      )}
      {firstTimeVisitor && (
        <CommonModal
          openModal={firstTimeVisitor}
          onClickFunc={() => {
            setFirstTimeVisitor(false);
          }}
          customStyles={{
            padding: 0,
            top: "10%",
            maxHeight: "fit-content !important",
            height: "100% !important",
            backgroundColor:
              theme.palette.mode === "dark" ? "#111112" : "#D9D9D9",
            borderRadius: "10px"
          }}
        >
          <EbookPromoContainer>
            <BookSVG
              color={theme.palette.text.primary}
              height={"79"}
              width={"98"}
            />
            <EbookPromoTextCol>
              <EbookPromoTitle>
                DOWNLOAD OUR{" "}
                <span style={{ color: theme.palette.customBlue.main }}>
                  FREE
                </span>{" "}
                EBOOK!
              </EbookPromoTitle>
              <EbookPromoSubTitle>
                Learn how Qortal is leveraging the power of blockchain
                technology to revolutionize many industries on the normal
                internet.
              </EbookPromoSubTitle>
            </EbookPromoTextCol>
            <EbookPromoButton
              onClick={() => {
                ReactGA.event({
                  category: "User",
                  action: "Clicked Download Ebook Button on Homepage Modal",
                  label: "Clicked Download Ebook Button on Homepage Modal"
                });
                router.push("/ebook");
              }}
            >
              <DownloadSVG
                color={theme.palette.text.primary}
                height={"14"}
                width={"14"}
              />
              DOWNLOAD HERE
            </EbookPromoButton>
          </EbookPromoContainer>
        </CommonModal>
      )}
    </Container>
  );
};

export default LandingPage;
