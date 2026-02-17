import { Iblog } from "@/types/blog";
import Title from "../shared/Title/Title";
import ViewButton from "../shared/ViewButton/ViewButton";
import BlogCard from "../blog/BlogCard";

interface BlogArticlesProps {
  showTitle?: boolean;
  title?: string;
  subtitle?: string;
}

export default function BlogArticles({
  showTitle = true,
  title = "Blog and Articles",
  subtitle = "Insights and tips from our experts",
}: BlogArticlesProps) {
  const blogs: Iblog[] = [
    {
      id: "1",
      title: "10 Tips for First-Time Home Buyers",
      description:
        "Essential advice to help you navigate your first home purchase with confidence.",
      date: "30 January, 2026",
      category: "Selling Tips",
      image: "/blog.jpg",
    },
    {
      id: "2",
      title: "10 Tips for First-Time Home Buyers",
      description:
        "Essential advice to help you navigate your first home purchase with confidence.",
      date: "30 January, 2026",
      category: "Selling Tips",
      image: "/blog.jpg",
    },
    {
      id: "3",
      title: "10 Tips for First-Time Home Buyers",
      description:
        "Essential advice to help you navigate your first home purchase with confidence.",
      date: "30 January, 2026",
      category: "Selling Tips",
      image: "/blog.jpg",
    },
    {
      id: "4",
      title: "10 Tips for First-Time Home Buyers",
      description:
        "Essential advice to help you navigate your first home purchase with confidence.",
      date: "30 January, 2026",
      category: "Selling Tips",
      image: "/blog.jpg",
    },
  ];
  return (
    <div className='py-1 mb-16 md:mb-10 md:mx-12.5'>
      {showTitle && (
        <div className='flex flex-col items-center justify-center text-center px-4 md:px-8 mb-10'>
          <Title
            title={title}
            subtitle={subtitle}
            titleClass={
              "max-w-[750px] text-[35px] md:text-[48px] font-bold leading-tight"
            }
            subtitleClass={
              "text-lg md:text-[24px] mb-6 md:mb-7 max-w-[500px] mt-2 "
            }
          />
        </div>
      )}
      <div className='px-4 md:px-8 mt-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-between lg:grid-cols-4'>
          {blogs.map((blog, idx) => (
            <BlogCard blog={blog} key={idx + 1} />
          ))}
        </div>
      </div>
      <div className='flex justify-center items-center text-center mt-9'>
        <ViewButton label='View All Articles' href='/blog' />
      </div>
    </div>
  );
}
