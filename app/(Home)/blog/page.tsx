import BlogCard from "@/components/blog/BlogCard";
import PageTitle from "@/components/shared/pagetitle/PageTitle";
import { Iblog } from "@/types/blog";

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

const page = () => {
  return (
    <div>
      <PageTitle
        title='Blog and Articles'
        subtitle='Insights and tips from our experts'
      />
      <div className='max-w-460 mx-auto px-8 mt-8 my-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-between lg:grid-cols-4'>
          {blogs.map((blog, idx) => (
            <BlogCard blog={blog} key={idx + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
