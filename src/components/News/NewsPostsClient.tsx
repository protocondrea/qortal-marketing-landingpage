"use client";
import React from "react";
import {
  MainNewsWrapper,
  NewsCard,
  NewsCardBody,
  NewsCardDate,
  NewsCardImage,
  NewsCardsGrid,
  NewsCardTitle,
  NewsCardWrapper,
  NewsTitle
} from "./NewsPostsClient-styles";
import ReactGA from "react-ga4";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { formatDateWithSuffix } from "../../utils/formatDateWithSuffix";

export interface NewsPost {
  title: string;
  body: string;
  thumbnail: string;
  identifier: string;
  created: number;
}

interface NewsPostsClientProps {
  news: NewsPost[];
}

const NewsPostsClient: React.FC<NewsPostsClientProps> = ({ news }) => {
  const router = useRouter();
  return (
    <MainNewsWrapper>
      <NewsTitle>NEWS & ANNOUNCEMENTS</NewsTitle>
      <NewsCardsGrid>
        {news
          .sort((a, b) => b.created - a.created)
          .map((item) => {
            return (
              <NewsCard
                key={item.identifier}
                aria-label="Visit this Qortal News and Announcements post"
                role="button"
                tabIndex={0}
                onClick={() => {
                  ReactGA.event({
                    category: "User",
                    action: `Clicked on news post: ${item.title} from news page`,
                    label: `Clicked on news post: ${item.title} from news page`
                  });
                  router.push(`/news/${item.identifier}`);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ReactGA.event({
                      category: "User",
                      action: `Clicked on news post: ${item.title} from news page`,
                      label: `Clicked on news post: ${item.title} from news page`
                    });
                    router.push(`/news/${item.identifier}`);
                  }
                }}
              >
                <NewsCardImage
                  src={item.thumbnail}
                  alt={item.title}
                  width={656}
                  height={440}
                  quality={100}
                />
                <NewsCardWrapper>
                  <NewsCardTitle>{item.title}</NewsCardTitle>
                  <NewsCardBody>{parse(item.body)}</NewsCardBody>
                  <NewsCardDate>
                    {formatDateWithSuffix(item.created)}
                  </NewsCardDate>
                </NewsCardWrapper>
              </NewsCard>
            );
          })}
      </NewsCardsGrid>
    </MainNewsWrapper>
  );
};

export default NewsPostsClient;
