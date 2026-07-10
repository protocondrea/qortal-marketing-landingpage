"use client";
import React, { useEffect, useState } from "react";
import {
  AndroidIcon,
  AppleLogo,
  ChromeStoreLogo,
  CommandLineModalContainer,
  CommandLineModalContent,
  CommandLineModalText,
  Container,
  DownloadCard,
  DownloadCol,
  DownloadContainer,
  DownloadCoreRow,
  DownloadNowText,
  DownloadsCoreGrid,
  DownloadsTitle,
  DownloadSubCol,
  DownloadSubText,
  DownloadsUIGrid,
  DownloadText,
  DownloadText1,
  DownloadText3,
  DownloadTextCol,
  DownloadUIRow,
  IPhoneRow,
  MainCol,
  MainRow,
  OtherVersionsCol,
  OtherVersionsRow,
  OtherVersionsText,
  Screenshot1,
  Screenshot2,
  Screenshot3,
  ScreenshotCol,
  ScreenshotContainer
} from "./Downloads-styles";
import Image from "next/image";
import ReactGA from "react-ga4";
import { useMediaQuery, useTheme } from "@mui/material";
import { SupportModal } from "../Common/Modal/SupportModal";
import { motion, AnimatePresence } from "framer-motion";
import { UAParser } from "ua-parser-js";
import { CommandLineSVG } from "../Common/Icons/CommandLineSVG";
import { CloseIcon } from "../Common/Modal/SupportModal-styles";
import { CheckmarkSVG } from "../Common/Icons/CheckmarkSVG";

const Downloads = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const parser = new UAParser();

  const result = parser.getResult();

  const isIOS = result.os.name === "iOS"; // Covers both iPhones & iPads

  const [openSupportModal, setOpenSupportModal] = useState<boolean>(false);
  const [openCommandLineModal, setOpenCommandLineModal] =
    useState<boolean>(false);

  // UI Downloads

  const androidDownload = () => {
    const link = document.createElement("a");
    link.href = "https://link.qortal.dev/go";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenSupportModal(true);
  };

  const chromeWebStoreRedirect = () => {
    setOpenSupportModal(true);
    window.open("https://link.qortal.dev/extension", "_blank");
  };

  const windowsDesktopDownload = async () => {
    const link = document.createElement("a");
    link.href = "https://link.qortal.dev/hub-windows";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenSupportModal(true);
  };

  const linuxDesktopDownload = async () => {
    const link = document.createElement("a");
    link.href = "https://link.qortal.dev/hub-linux";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenSupportModal(true);
  };

  const linuxCommandLineScript = async () => {
    try {
      await navigator.clipboard.writeText(
        "bash <(curl -fsSL https://link.qortal.dev/linux-script || wget -qO- https://link.qortal.dev/linux-script)"
      );
      setOpenSupportModal(true);
      setOpenCommandLineModal(true);
    } catch (err) {
      console.error("Failed to copy install script:", err);
    }
  };

  const macDesktopDownload = async () => {
    const link = document.createElement("a");
    link.href = "https://link.qortal.dev/hub-mac";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenSupportModal(true);
  };

  // Core Downloads

  const coreWindowsDownload = async () => {
    const link = document.createElement("a");
    link.href = "https://link.qortal.dev/windows-core";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenSupportModal(true);
  };

  const coreLinuxDownload = async () => {
    const link = document.createElement("a");
    link.href = "https://link.qortal.dev/linux-core";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenSupportModal(true);
  };

  const coreMacDownload = async () => {
    const link = document.createElement("a");
    link.href = "https://link.qortal.dev/mac-core";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenSupportModal(true);
  };

  const iOSRedirect = () => {
    window.open("https://link.qortal.dev/ios-go", "_blank");
  };

  const supportModalVariants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 95
      }
    },
    closed: {
      opacity: 0.2,
      x: 100,
      transition: {
        duration: 0.2
      }
    }
  };

  const commandLineModalVariants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 95
      }
    },
    closed: {
      opacity: 0.2,
      x: -100,
      transition: {
        duration: 0.2
      }
    }
  };

  const supportModalVariantsMobile = {
    opened: {
      opacity: 1,
      y: "-50%", // Aligns with `top: "50%"` and centers the modal
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    },
    closed: {
      opacity: 0,
      y: "100%", // Moves the modal off-screen below
      transition: {
        duration: 0.3 // Faster closing animation
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (openCommandLineModal) {
        setOpenCommandLineModal(false);
      }
    }, 30000);
  }, [openCommandLineModal]);

  return (
    <Container>
      <AnimatePresence>
        {openSupportModal && (
          <motion.div
            animate={"opened"}
            initial={"closed"}
            exit={{ opacity: 0 }}
            variants={
              isMobile ? supportModalVariantsMobile : supportModalVariants
            }
            style={{
              position: "fixed",
              bottom: "0px",
              left: "0",
              right: "0",
              width: "100%",
              height: "auto",
              zIndex: 5,
              backgroundColor: "transparent"
            }}
          >
            <SupportModal
              setCloseSupportModal={() => setOpenSupportModal(false)}
            />
          </motion.div>
        )}
        {openCommandLineModal && (
          <motion.div
            animate={"opened"}
            initial={"closed"}
            exit={{ opacity: 0 }}
            variants={commandLineModalVariants}
            style={{
              position: "fixed",
              bottom: "0px",
              left: "0",
              right: "0",
              width: "100%",
              height: "auto",
              zIndex: 5,
              backgroundColor: "transparent"
            }}
          >
            <CommandLineModalContainer>
              <CloseIcon
                onClickFunc={() => setOpenCommandLineModal(false)}
                color={theme.palette.text.primary}
                height="25px"
                width="25px"
              />
              <CheckmarkSVG
                color={theme.palette.text.primary}
                height="50px"
                width="50px"
              />
              <CommandLineModalContent>
                <CommandLineModalText>
                  Copied script successfully!
                  <br />
                  You can now paste that into terminal and push ENTER.
                  <br />
                  <br />
                  This will: Download/Run the script once pasted in terminal.
                  <br />
                  <br />
                  The script will:
                  <ul
                    style={{
                      textAlign: "left",
                      margin: "8px 0",
                      paddingLeft: "24px"
                    }}
                  >
                    <li>
                      Download and setup Qortal Hub, Qortal Core, and automation
                    </li>
                    <li>Setup Qortal Icon theme</li>
                    <li>
                      Setup Qortal Launchers and put them in the menu if it
                      exists
                    </li>
                    <li>Use Qortal Icons on the launchers</li>
                    <li>Download and setup all dependencies</li>
                  </ul>
                </CommandLineModalText>
              </CommandLineModalContent>
            </CommandLineModalContainer>
          </motion.div>
        )}
      </AnimatePresence>
      <DownloadsTitle>
        {isIOS ? "Access Web App Now" : "DOWNLOADS"}
      </DownloadsTitle>
      <MainRow>
        <MainCol>
          <DownloadTextCol>
            <DownloadText>
              <strong>Qortal Hub</strong>
            </DownloadText>
            <DownloadSubText>
              Access Q-Apps, messaging, groups, wallets, publishing, and the
              Qortal network through one desktop experience.
              <br />
              <br />
              Use a Local Node for the full decentralized experience, or
              connect through a Public Node for quick access with some
              limitations.
            </DownloadSubText>
          </DownloadTextCol>
          {isIOS ? (
            <IPhoneRow>
              <DownloadCol style={{ minWidth: "300px" }}>
                <DownloadCard
                  role="button"
                  aria-label="Redirect to the iOS Hosted Web App for Qortal Go"
                  tabIndex={0}
                  onClick={() => {
                    ReactGA.event({
                      category: "User",
                      action: "Clicked iOS Redirect Button",
                      label: "Clicked iOS Redirect Button"
                    });
                    iOSRedirect();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      ReactGA.event({
                        category: "User",
                        action: "Clicked iOS Redirect Button",
                        label: "Clicked iOS Redirect Button"
                      });
                      iOSRedirect();
                    }
                  }}
                >
                  <AppleLogo color={"#0177DB"} width={"45"} height={"45"} />
                  <DownloadText1>iPhone</DownloadText1>
                </DownloadCard>
              </DownloadCol>
            </IPhoneRow>
          ) : isMobile && !isIOS ? (
            <IPhoneRow>
              <DownloadCol style={{ minWidth: "300px" }}>
                <DownloadCard
                  role="button"
                  aria-label="Redirect to the Android APK"
                  tabIndex={0}
                  onClick={() => {
                    ReactGA.event({
                      category: "User",
                      action: "Clicked Android Download Button",
                      label: "Clicked Android Download Button"
                    });
                    androidDownload();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      ReactGA.event({
                        category: "User",
                        action: "Clicked Android Download Button",
                        label: "Clicked Android Download Button"
                      });
                      androidDownload();
                    }
                  }}
                >
                  <AndroidIcon width={"40"} height={"70"} color={"#a4c639"} />
                  <DownloadText1>Android</DownloadText1>
                </DownloadCard>
              </DownloadCol>
            </IPhoneRow>
          ) : (
            <DownloadContainer>
              <DownloadUIRow>
                <DownloadsUIGrid>
                  <DownloadCol>
                    <DownloadCard
                      aria-label="Download the Windows Desktop version of Qortal"
                      tabIndex={0}
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Windows Desktop Download Button",
                          label: "Clicked Windows Desktop Download Button"
                        });
                        windowsDesktopDownload();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          ReactGA.event({
                            category: "User",
                            action: "Clicked Windows Desktop Download Button",
                            label: "Clicked Windows Desktop Download Button"
                          });
                          windowsDesktopDownload();
                        }
                      }}
                    >
                      <Image
                        src={"/images/Downloads/WindowsLogo.png"}
                        width={40}
                        height={40}
                        alt={"Windows Logo"}
                      />
                      <DownloadText1>Windows</DownloadText1>
                    </DownloadCard>
                  </DownloadCol>
                  <DownloadCol className="mac-col">
                    <DownloadCard
                      className="mac-card"
                      aria-label="Download the Mac Desktop version of Qortal"
                      tabIndex={0}
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Mac Desktop Download Button",
                          label: "Clicked Mac Desktop Download Button"
                        });
                        macDesktopDownload();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          ReactGA.event({
                            category: "User",
                            action: "Clicked Mac Desktop Download Button",
                            label: "Clicked Mac Desktop Download Button"
                          });
                          macDesktopDownload();
                        }
                      }}
                    >
                      <AppleLogo color={"#0177DB"} width={"40"} height={"40"} />
                      <DownloadText1>Mac</DownloadText1>
                    </DownloadCard>
                  </DownloadCol>
                  <DownloadCol>
                    <DownloadCard
                      aria-label="Download the Linux Desktop version of Qortal"
                      tabIndex={0}
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Linux Desktop Download Button",
                          label: "Clicked Linux Desktop Download Button"
                        });
                        linuxDesktopDownload();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          ReactGA.event({
                            category: "User",
                            action: "Clicked Linux Desktop Download Button",
                            label: "Clicked Linux Desktop Download Button"
                          });
                          linuxDesktopDownload();
                        }
                      }}
                    >
                      <Image
                        src={"/images/Downloads/LinuxLogo.png"}
                        width={40}
                        height={40}
                        alt={"Linux Logo"}
                      />
                      <DownloadText1>Linux</DownloadText1>
                    </DownloadCard>
                  </DownloadCol>
                  <DownloadCol>
                    <DownloadCard
                      aria-label="Redirect to the Chrome Web Store"
                      tabIndex={0}
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Chrome Web Store Download Button",
                          label: "Clicked Chrome Web Store Download Button"
                        });
                        chromeWebStoreRedirect();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          ReactGA.event({
                            category: "User",
                            action: "Clicked Chrome Web Store Download Button",
                            label: "Clicked Chrome Web Store Download Button"
                          });
                          chromeWebStoreRedirect();
                        }
                      }}
                    >
                      <ChromeStoreLogo
                        width="45"
                        height="45"
                        color="transparent"
                      />
                      <DownloadText1>Extension</DownloadText1>
                    </DownloadCard>
                  </DownloadCol>
                  <DownloadCol>
                    <DownloadCard
                      role="button"
                      aria-label="Redirect to the Android APK"
                      tabIndex={0}
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Android Download Button",
                          label: "Clicked Android Download Button"
                        });
                        androidDownload();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          ReactGA.event({
                            category: "User",
                            action: "Clicked Android Download Button",
                            label: "Clicked Android Download Button"
                          });
                          androidDownload();
                        }
                      }}
                    >
                      <AndroidIcon
                        width={"40"}
                        height={"40"}
                        color={"#a4c639"}
                      />
                      <DownloadText1>Android</DownloadText1>
                    </DownloadCard>
                  </DownloadCol>
                  <DownloadCol>
                    <DownloadCard
                      aria-label="Copy the Linux Desktop version of Qortal command line script"
                      tabIndex={0}
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action:
                            "Clicked Linux Command Line Script Copy Button",
                          label: "Clicked Linux Command Line Script Copy Button"
                        });
                        linuxCommandLineScript();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          ReactGA.event({
                            category: "User",
                            action:
                              "Clicked Linux Command Line Script Copy Button",
                            label:
                              "Clicked Linux Command Line Script Copy Button"
                          });
                          linuxCommandLineScript();
                        }
                      }}
                    >
                      <CommandLineSVG
                        width="40"
                        height="40"
                        color={"transparent"}
                      />
                      <DownloadText3>Linux (Script)</DownloadText3>
                    </DownloadCard>
                  </DownloadCol>
                </DownloadsUIGrid>
              </DownloadUIRow>
              <DownloadCoreRow>
                <DownloadSubCol>
                  <DownloadTextCol>
                  <DownloadText style={{ marginTop: 0 }}>
                    <strong>Qortal Core</strong>
                  </DownloadText>
                  <DownloadSubText>
                    Power the decentralized infrastructure behind Qortal Hub.
                    <br />
                    <br />
                    Run a local node for full decentralized access, local-first
                    data handling, publishing, minting, and improved QDN
                    reliability.
                  </DownloadSubText>
                  </DownloadTextCol>
                  <DownloadsCoreGrid>
                    <DownloadCol>
                      <DownloadCard
                        aria-label="Download the Windows Core of Qortal"
                        tabIndex={0}
                        onClick={() => {
                          ReactGA.event({
                            category: "User",
                            action: "Clicked Windows Core Download Button",
                            label: "Clicked Windows Core Download Button"
                          });
                          coreWindowsDownload();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            ReactGA.event({
                              category: "User",
                              action: "Clicked Windows Core Download Button",
                              label: "Clicked Windows Core Download Button"
                            });
                            coreWindowsDownload();
                          }
                        }}
                      >
                        <Image
                          src={"/images/Downloads/WindowsLogo.png"}
                          width={40}
                          height={40}
                          alt={"Windows Logo"}
                        />
                        <DownloadText1>Windows</DownloadText1>
                      </DownloadCard>
                    </DownloadCol>
                    <DownloadCol className="mac-col">
                      <DownloadCard
                        className="mac-card"
                        aria-label="Download the Mac Core of Qortal"
                        tabIndex={0}
                        onClick={() => {
                          ReactGA.event({
                            category: "User",
                            action: "Clicked Mac Core Download Button",
                            label: "Clicked Mac Core Download Button"
                          });
                          coreMacDownload();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            ReactGA.event({
                              category: "User",
                              action: "Clicked Mac Core Download Button",
                              label: "Clicked Mac Core Download Button"
                            });
                            coreMacDownload();
                          }
                        }}
                      >
                        <AppleLogo
                          color={"#0177DB"}
                          width={"40"}
                          height={"40"}
                        />
                        <DownloadText1>Mac</DownloadText1>
                      </DownloadCard>
                    </DownloadCol>
                    <DownloadCol>
                      <DownloadCard
                        aria-label="Download the Linux core of Qortal"
                        tabIndex={0}
                        onClick={() => {
                          ReactGA.event({
                            category: "User",
                            action: "Clicked Linux Core Download Button",
                            label: "Clicked Linux Core Download Button"
                          });
                          coreLinuxDownload();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            ReactGA.event({
                              category: "User",
                              action: "Clicked Linux Core Download Button",
                              label: "Clicked Linux Core Download Button"
                            });
                            coreLinuxDownload();
                          }
                        }}
                      >
                        <Image
                          src={"/images/Downloads/LinuxLogo.png"}
                          width={40}
                          height={40}
                          alt={"Linux Logo"}
                        />
                        <DownloadText1>Linux</DownloadText1>
                      </DownloadCard>
                    </DownloadCol>
                  </DownloadsCoreGrid>
                </DownloadSubCol>
              </DownloadCoreRow>
            </DownloadContainer>
          )}
          {!isIOS && (
            <OtherVersionsCol>
              <OtherVersionsRow>
                <OtherVersionsText>
                  To download other versions of{" "}
                  <span style={{ fontWeight: "bold" }}>Qortal Hub</span> not
                  listed here, click
                  <a
                    href="https://github.com/Qortal/Qortal-Hub/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      ReactGA.event({
                        category: "User",
                        action: "Clicked Qortal Hub Other Versions Link",
                        label: "Clicked Qortal Hub Other Versions Link"
                      });
                    }}
                  >
                    here
                  </a>
                </OtherVersionsText>
              </OtherVersionsRow>
              <OtherVersionsRow>
                <OtherVersionsRow>
                  <OtherVersionsText>
                    To download other versions of{" "}
                    <span style={{ fontWeight: "bold" }}>Qortal Go</span> not
                    listed here, click
                    <a
                      href="https://github.com/Qortal/Qortal-Mobile/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        ReactGA.event({
                          category: "User",
                          action: "Clicked Qortal Go Other Versions Link",
                          label: "Clicked Qortal Go Other Versions Link"
                        });
                      }}
                    >
                      here
                    </a>
                  </OtherVersionsText>
                </OtherVersionsRow>
              </OtherVersionsRow>
            </OtherVersionsCol>
          )}
        </MainCol>
        <MainCol>
          <ScreenshotContainer container spacing={4}>
            <ScreenshotCol item md={3} xs={12}>
              <Screenshot2
                src={"/images/Downloads/TrifectaScreenshot2.png"}
                quality={100}
                width={386}
                height={803}
                alt={"Qortal Screenshot 2"}
              />
            </ScreenshotCol>
            <ScreenshotCol item md={9} xs={12}>
              <Screenshot1
                src={"/images/Downloads/TrifectaScreenshot1.png"}
                quality={100}
                width={1920}
                height={1080}
                alt={"Qortal Screenshot 1"}
              />
            </ScreenshotCol>
            <ScreenshotCol item md={12} xs={12}>
              <Screenshot3
                src={"/images/Downloads/ThreadsScreenshot.png"}
                quality={100}
                width={1100}
                height={642}
                alt={"Qortal Screenshot 3"}
              />
            </ScreenshotCol>
          </ScreenshotContainer>
        </MainCol>
      </MainRow>
      <DownloadNowText>
        <span style={{ color: theme.palette.customBlue.main }}>Install</span>{" "}
        now and
        <br /> start your{" "}
        <span style={{ color: theme.palette.customBlue.main }}>Journey</span>
      </DownloadNowText>
    </Container>
  );
};

export default Downloads;
