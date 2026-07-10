"use client";
import React from "react";
import {
  BlogCategoriesRow,
  BlogDateAndCategoryCol,
  BlogPageTitle,
  BlogPostBody,
  BlogPostCard,
  BlogPostCategory,
  BlogPostDate,
  BlogPostImage,
  BlogPostsContainer,
  BlogPostTitle,
  BlogSubContainer,
  Divider,
  MainBlogWrapper
} from "./BlogPostsClient-styles";
import { formatDateWithSuffix } from "../../utils/formatDateWithSuffix";
import parse from "html-react-parser";
import ReactGA from "react-ga4";
import { useRouter } from "next/navigation";
export interface BlogPost {
  title: string;
  body: string;
  thumbnail: string;
  categories: string[];
  identifier: string;
  created: number;
}

interface BlogPostsClientProps {
  blogs: BlogPost[];
}

const BlogPostsClient: React.FC<BlogPostsClientProps> = ({ blogs }) => {
  const router = useRouter();
  return (
    <MainBlogWrapper>
      <BlogPageTitle>BLOG</BlogPageTitle>
      <BlogPostsContainer>
        {blogs
          .filter((blog) => blog.thumbnail)
          .sort((a, b) => b.created - a.created)
          .map((blog) => (
            <BlogPostCard
              aria-label="Click to read more"
              key={blog.identifier}
              role="button"
              tabIndex={0}
              onClick={() => {
                router.push(`/blog/${blog.identifier}`);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/blog/${blog.identifier}`);
                }
              }}
            >
              <BlogPostImage
                src={blog.thumbnail}
                alt={blog.title}
                width={500}
                height={500}
              />
              <BlogSubContainer>
                <BlogPostTitle>{blog.title}</BlogPostTitle>
                <BlogPostBody>{parse(blog.body)}</BlogPostBody>
              </BlogSubContainer>
              <BlogPostDate>
                {formatDateWithSuffix(blog.created)}
              </BlogPostDate>
            </BlogPostCard>
          ))}
      </BlogPostsContainer>
    </MainBlogWrapper>
  );
};

export default BlogPostsClient;
