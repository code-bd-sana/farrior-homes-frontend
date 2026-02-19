"use client";

import BlogCard from "@/components/blog/BlogCard";
import { Iblog } from "@/types/blog";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiEdit3, FiX } from "react-icons/fi";

const UploadCloud = () => (
  <svg
    width='28'
    height='28'
    viewBox='0 0 24 24'
    fill='none'
    stroke='#5a9e7c'
    strokeWidth='1.5'
    strokeLinecap='round'
    strokeLinejoin='round'>
    <polyline points='16 16 12 12 8 16' />
    <line x1='12' y1='12' x2='12' y2='21' />
    <path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3' />
  </svg>
);

type QuillInstance = {
  root?: { innerHTML?: string };
  setText?: (text: string) => void;
};

type QuillConstructor = new (
  el: HTMLElement,
  options?: Record<string, unknown>,
) => QuillInstance;

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

const BlogModal = ({
  isOpen,
  onClose,
  mode,
}: {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
}) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<QuillInstance | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const loadQuill = async () => {
      if (typeof window === "undefined") return;

      try {
        const QuillModule = await import("quill");
        const QuillCtor = (QuillModule?.default ??
          QuillModule) as unknown as QuillConstructor;

        if (!document.querySelector('link[href*="quill.snow.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.snow.css";
          document.head.appendChild(link);
        }

        setTimeout(() => {
          if (quillRef.current && !quillInstanceRef.current) {
            try {
              quillInstanceRef.current = new QuillCtor(quillRef.current, {
                theme: "snow",
                placeholder: "Enter blog details",
                modules: {
                  toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    ["link"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ header: [1, 2, 3, false] }],
                    ["clean"],
                  ],
                },
              });
            } catch (err) {
              console.error("Quill initialization failed:", err);
            }
          }
        }, 100);
      } catch (err) {
        console.error("Failed to load Quill editor:", err);
      }
    };

    loadQuill();

    return () => {
      quillInstanceRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const setPreviewImage = (file: File) => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setPreviewImage(file);
  };

  const handleClose = () => {
    setBlogTitle("");
    setCategory("");
    setPublishDate("");
    quillInstanceRef.current?.setText?.("");
    quillInstanceRef.current = null;
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    onClose();
  };

  const handleDone = () => {
    const content = quillInstanceRef.current?.root?.innerHTML ?? "";
    console.log(`${mode === "add" ? "Adding" : "Editing"} Blog:`, {
      title: blogTitle,
      category,
      publishDate,
      content,
      image: uploadedImage,
    });
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
        <div className='bg-white rounded-xl border-2 border-[#D1CEC6] w-full max-w-2xl mx-4 shadow-xl'>
          <div className='flex items-center justify-between px-6 py-5 border-b border-[#D1CEC6]'>
            <h2 className='text-2xl font-semibold text-gray-800'>
              {mode === "add" ? "Add" : "Edit"} Blog
            </h2>
            <button
              onClick={handleClose}
              className='text-gray-400 hover:text-gray-600'>
              <FiX size={22} />
            </button>
          </div>

          <div className='px-6 py-5 space-y-5'>
            <div>
              <label className='block text-sm text-gray-600 mb-2'>Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden ${
                  dragOver
                    ? "border-[#5a9e7c] bg-[#f0faf4]"
                    : "border-[#D1CEC6] bg-[#fafafa]"
                }`}>
                {uploadedImage ? (
                  <Image
                    src={uploadedImage}
                    alt='Uploaded'
                    className='w-full h-full object-cover'
                    height={200}
                    width={200}
                  />
                ) : (
                  <>
                    <div className='w-12 h-12 rounded-full bg-[#e8f4ef] flex items-center justify-center mb-2'>
                      <UploadCloud />
                    </div>
                    <span className='text-sm text-gray-600 font-medium'>
                      Click to upload image
                    </span>
                    <span className='text-xs text-gray-400 mt-1'>
                      PNG, JPG up to 10MB
                    </span>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageUpload}
              />
            </div>

            <div>
              <label className='block text-sm text-gray-600 mb-2'>
                Blog Title
              </label>
              <input
                type='text'
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder='Enter blog title'
                className='w-full border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4A90B8]'
              />
            </div>
            <div className='grid gap-4 md:grid-cols-2'>
              <div>
                <label className='block text-sm text-gray-600 mb-2'>
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-full border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#4A90B8]'>
                  <option value='' disabled>
                    Select category
                  </option>
                  <option value='market-updates'>Market Updates</option>
                  <option value='selling-tips'>Selling Tips</option>
                  <option value='buying-guide'>Buying Guide</option>
                  <option value='investment'>Investment</option>
                </select>
              </div>
              <div>
                <label className='block text-sm text-gray-600 mb-2'>
                  Publish Date
                </label>
                <input
                  type='date'
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className='w-full border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#4A90B8]'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm text-gray-600 mb-2'>
                Blog Details
              </label>
              <div className='border border-[#D1CEC6] rounded-lg overflow-hidden'>
                <div ref={quillRef} style={{ minHeight: "160px" }} />
              </div>
            </div>
          </div>

          <div className='flex justify-end gap-3 px-6 py-4 border-t border-[#D1CEC6]'>
            <button
              onClick={handleClose}
              className='px-5 py-2 rounded-lg border border-[#D1CEC6] text-gray-600 text-sm hover:bg-gray-50'>
              Cancel
            </button>
            <button
              onClick={handleDone}
              className='px-5 py-2 rounded-lg bg-[#5F8E7E] text-white text-sm hover:bg-[#4e7a6c]'>
              Done
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #d1cec6;
          background: #fafafa;
        }
        .ql-container.ql-snow {
          border: none;
          font-size: 14px;
        }
        .ql-editor {
          min-height: 140px;
          padding: 12px 16px;
          color: #374151;
        }
        .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
      `}</style>
    </>
  );
};

export default function Page() {
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);

  return (
    <div className='bg-white rounded-xl border border-[#D1CEC6]'>
      <div className='px-6 py-5'>
        <div className='flex md:flex-row flex-col items-center justify-between  border-b border-[#D1CEC6] pb-3'>
          <div className='text-xl md:text-2xl mb-3 md:mb-0 '>
            Blog Management
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => setModalMode("edit")}
              className='flex items-center gap-1 px-6 py-2.25 text-(--primary-text-color) text-base border border-[#D1CEC6] rounded-lg hover:bg-(--primary-hover) hover:text-white transition-colors cursor-pointer'>
              <FiEdit3 size={20} />
              Edit
            </button>
            <button
              onClick={() => setModalMode("add")}
              className='px-6 py-2.5 bg-(--primary) text-base text-white rounded-lg hover:bg-(--primary-hover) transition-colors cursor-pointer'>
              + Add Blog
            </button>
          </div>
        </div>
      </div>
      <div className='md:mx-5 px-4 md:px-8 mt-8 my-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-between lg:grid-cols-4'>
          {blogs.map((blog, idx) => (
            <BlogCard blog={blog} key={idx + 1} />
          ))}
        </div>
      </div>

      {modalMode && (
        <BlogModal
          isOpen={true}
          onClose={() => setModalMode(null)}
          mode={modalMode}
        />
      )}
    </div>
  );
}
