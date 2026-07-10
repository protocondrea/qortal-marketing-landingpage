"use client";

import { useEffect, useMemo } from "react";
import "./styles-demo.css";
import { getHubPreviewHtml, initHubPreviewAfterMount } from "./demo.js";

const Demo = () => {
  const html = useMemo(() => getHubPreviewHtml(), []);

  useEffect(() => {
    initHubPreviewAfterMount();
  }, []);

  return (
    <div
      id="hub-preview-root"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Demo;
