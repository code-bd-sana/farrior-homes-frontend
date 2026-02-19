"use client";

import { useState, useEffect, useRef } from "react";
import ServiceCard from "@/components/home/services/ServiceCard";
import ViewButton from "@/components/shared/ViewButton/ViewButton";
import { FiEdit3, FiX } from "react-icons/fi";

// Quill is loaded dynamically to avoid SSR issues
let Quill: unknown;

// Minimal local types to avoid `any` and keep runtime checks
type QuillInstance = {
  root?: { innerHTML?: string };
  setText?: (text: string) => void;
};

type QuillConstructor = new (
  el: HTMLElement,
  options?: Record<string, unknown> | undefined,
) => QuillInstance;

const AddServiceModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [serviceTitle, setServiceTitle] = useState("");
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<QuillInstance | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const loadQuill = async () => {
      if (typeof window === "undefined") return;

      try {
        const QuillModule = await import("quill");
        const QuillCtor = QuillModule?.default ?? QuillModule;
        Quill = QuillCtor;

        // Import Quill styles (only once)
        if (!document.querySelector('link[href*="quill.snow.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.snow.css";
          document.head.appendChild(link);
        }

        // initialize editor after a short delay to ensure DOM is ready
        setTimeout(() => {
          if (quillRef.current && !quillInstanceRef.current && Quill) {
            // narrow `Quill` to a constructor if possible
            const QuillCtor = Quill as unknown as QuillConstructor;
            try {
              quillInstanceRef.current = new QuillCtor(
                quillRef.current as HTMLElement,
                {
                  theme: "snow",
                  placeholder: "Enter service details",
                  modules: {
                    toolbar: [
                      ["bold", "italic", "underline", "strike"],
                      ["link"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      [{ header: [1, 2, 3, false] }],
                      ["clean"],
                    ],
                  },
                },
              );
            } catch (err) {
              // fail gracefully if constructor shape is unexpected
              // eslint-disable-next-line no-console
              console.error("Quill initialization failed:", err);
              quillInstanceRef.current = null;
            }
          }
        }, 100);
      } catch (err) {
        // helpful error for debugging
        // eslint-disable-next-line no-console
        console.error("Failed to load Quill editor:", err);
      }
    };

    loadQuill();

    return () => {
      quillInstanceRef.current = null;
    };
  }, [isOpen]);

  const handleDone = () => {
    const content = quillInstanceRef.current?.root?.innerHTML ?? "";
    console.log("Service Title:", serviceTitle);
    console.log("Service Details:", content);
    handleClose();
  };

  const handleClose = () => {
    setServiceTitle("");
    quillInstanceRef.current?.setText?.("");
    quillInstanceRef.current = null;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white rounded-xl border-2 border-[#4A90B8] w-full max-w-2xl mx-4 shadow-xl'>
        {/* Modal Header */}
        <div className='flex items-center justify-between px-6 py-5 border-b border-[#D1CEC6]'>
          <h2 className='text-2xl font-semibold text-gray-800'>Add Service</h2>
          <button
            onClick={handleClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'>
            <FiX size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className='px-6 py-5 space-y-5'>
          {/* Service Title */}
          <div>
            <label className='block text-sm text-gray-600 mb-2'>
              Service Title
            </label>
            <input
              type='text'
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              placeholder='Enter service title'
              className='w-full border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4A90B8] transition-colors'
            />
          </div>

          {/* Service Details - Quill Editor */}
          <div>
            <label className='block text-sm text-gray-600 mb-2'>
              Service Details
            </label>
            <div className='border border-[#D1CEC6] rounded-lg overflow-hidden'>
              <div ref={quillRef} style={{ minHeight: "160px" }} />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className='flex justify-end gap-3 px-6 py-4 border-t border-[#D1CEC6]'>
          <button
            onClick={handleClose}
            className='px-5 py-2 rounded-lg border border-[#D1CEC6] text-gray-600 text-sm hover:bg-gray-50 transition-colors'>
            Cancel
          </button>
          <button
            onClick={handleDone}
            className='px-5 py-2 rounded-lg bg-[#5F8E7E] text-white text-sm hover:bg-[#4e7a6c] transition-colors'>
            Done
          </button>
        </div>
      </div>

      {/* Quill toolbar style overrides */}
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
    </div>
  );
};

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='bg-white rounded-xl border border-[#D1CEC6]'>
      {/* Page title */}
      <div className='px-6 py-5'>
        <div className='flex justify-between border-b border-[#D1CEC6] pb-3'>
          <div className='text-xl md:text-2xl'>Service Management</div>
          <div className='flex'>
            <button className='text-(--primary-text-color) border border-[#D1CEC6] px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-50 transition-colors'>
              <FiEdit3 />
              <span>Edit</span>
            </button>
            {/* <button
              onClick={() => setIsModalOpen(true)}
              className='ml-2 bg-(--primary-color) text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity'>
              + Add Services
            </button> */}
            <div onClick={() => setIsModalOpen(true)}>
              {" "}
              <ViewButton label='+ Add Services' className='ml-2' />
            </div>
          </div>
        </div>
      </div>

      <div className='p-6'>
        <ServiceCard />
      </div>

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Page;
