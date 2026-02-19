"use client";

import { useState, useEffect, useRef } from "react";
import ServiceCard from "@/components/home/services/ServiceCard";
import { FiEdit3, FiX } from "react-icons/fi";

type QuillInstance = {
  root?: { innerHTML?: string };
  setText?: (text: string) => void;
};

type QuillConstructor = new (
  el: HTMLElement,
  options?: Record<string, unknown>,
) => QuillInstance;

const ServiceModal = ({
  isOpen,
  onClose,
  mode,
}: {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
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

  const handleDone = () => {
    const content = quillInstanceRef.current?.root?.innerHTML ?? "";
    console.log(`${mode === "add" ? "Adding" : "Editing"} Service:`, {
      title: serviceTitle,
      content,
    });
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
      <div className='bg-white rounded-xl border-2 border-[#D1CEC6] w-full max-w-2xl mx-4 shadow-xl'>
        <div className='flex items-center justify-between px-6 py-5 border-b border-[#D1CEC6]'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {mode === "add" ? "Add" : "Edit"} Service
          </h2>
          <button
            onClick={handleClose}
            className='text-gray-400 hover:text-gray-600'>
            <FiX size={22} />
          </button>
        </div>

        <div className='px-6 py-5 space-y-5'>
          <div>
            <label className='block text-sm text-gray-600 mb-2'>
              Service Title
            </label>
            <input
              type='text'
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              placeholder='Enter service title'
              className='w-full border border-[#D1CEC6] rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4A90B8]'
            />
          </div>

          <div>
            <label className='block text-sm text-gray-600 mb-2'>
              Service Details
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
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);

  return (
    <div className='bg-white rounded-xl border border-[#D1CEC6]'>
      <div className='px-6 py-5'>
        <div className='flex md:flex-row flex-col items-center justify-between border-b border-[#D1CEC6] pb-3'>
          <div className='text-xl md:text-2xl mb-3 md:mb-0 text-center md:text-start'>
            Service Management
          </div>
          <div className='flex flex-row gap-2 '>
            <button
              onClick={() => setModalMode("edit")}
              className='flex items-center gap-1 px-6 py-2.25 text-(--primary-text-color) text-base border border-[#D1CEC6] rounded-lg hover:bg-(--primary-hover) hover:text-white transition-colors'>
              <FiEdit3 size={20} />
              Edit
            </button>
            <button
              onClick={() => setModalMode("add")}
              className='px-6 py-2.5 bg-(--primary) text-base text-white rounded-lg hover:bg-(--primary-hover) transition-colors'>
              + Add Service
            </button>
          </div>
        </div>
      </div>

      <div className='p-6'>
        <ServiceCard />
      </div>

      {modalMode && (
        <ServiceModal
          isOpen={true}
          onClose={() => setModalMode(null)}
          mode={modalMode}
        />
      )}
    </div>
  );
};

export default Page;
