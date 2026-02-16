"use client";
import { Iblog } from "@/types/blog";
import React from "react";
import Card from "../shared/Card/Card";

interface BlogCardProps {
  blog: Iblog;
  variant?: "vertical" | "horizontal";
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, variant = "vertical" }) => {
  // console.log(blog, "blog is console log");

  const handleBlog = async () => {
    console.log("console lg");
  };

  // const cardData = {
  //   imageUrl: blog.image,
  //   badge: blog.category,
  //   title: blog.title,
  //   subtitle: blog.description,
  //   type: blog.category,
  //   primaryActionLabel: "View Details",
  // };

  return (
    <div className=''>
      <Card
        key={blog.id}
        id={blog.id}
        imageUrl={blog.image}
        badge={blog.category}
        title={blog.title}
        subtitle={blog.description}
        type={"blog"}
        date={blog.date}
        primaryActionLabel='View Details'
      />
    </div>
  );
};

export default BlogCard;
