"use client";
import image from "@/public/blog.jpg";
import { Iblog } from "@/types/blog";
import React from "react";
import Card from "../shared/Card/Card";

interface BlogCardProps {
  blog: Iblog;
  variant?: "vertical" | "horizontal";
}

const handleButton = async () => {
  console.log("Console log");
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, variant = "vertical" }) => {
  console.log(blog, "blog is console log");

  // const cardData = {
  //   imageUrl: blog.image,
  //   badge: blog.category,
  //   title: blog.title,
  //   subtitle: blog.description,
  //   type: blog.category,
  //   primaryActionLabel: "View Details",
  // };

  return (
    <div className=' '>
      <Card
        key={blog._id}
        imageUrl={image}
        badge={blog.category}
        title={blog.title}
        subtitle={blog.description}
        type={"news"}
        date={blog.date}
        primaryActionLabel='View Details'
        onPrimaryAction={handleButton}
      />
    </div>
  );
};

export default BlogCard;
