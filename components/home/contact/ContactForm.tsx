"use client";

import { useState } from "react";
import Title from "@/components/shared/Title/Title";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your API call here
      console.log("Form submitted:", formData);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='border border-[#D1CEC6] rounded-lg p-6'>
      <Title
        title={"Send Us a Message"}
        titleClass={"text-[20px] md:text-[24px] jost-600 font-bold mb-4"}
      />

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* First Name & Last Name Row */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='firstName' className='block text-sm mb-2'>
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-[#D1CEC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#619B7F] focus:border-transparent transition-all duration-300 text-sm'
              placeholder='John'
            />
          </div>
          <div>
            <label htmlFor='lastName' className='block text-sm mb-2'>
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-[#D1CEC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#619B7F] focus:border-transparent transition-all duration-300 text-sm'
              placeholder='Doe'
            />
          </div>
        </div>

        {/* Email & Phone Row */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='email' className='block text-sm mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-[#D1CEC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#619B7F] focus:border-transparent transition-all duration-300 text-sm'
              placeholder='john@example.com'
            />
          </div>
          <div>
            <label htmlFor='phone' className='block text-sm mb-2'>
              Phone
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 border border-[#D1CEC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#619B7F] focus:border-transparent transition-all duration-300 text-sm'
              placeholder='(123) 456-7890'
            />
          </div>
        </div>

        {/* Message Textarea */}
        <div>
          <label htmlFor='message' className='block text-sm   mb-2'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className='w-full px-4 py-3 border border-[#D1CEC6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#619B7F] focus:border-transparent transition-all duration-300 resize-none'
            placeholder='Tell us more about your needs...'
          />
        </div>

        {/* Submit Button */}
        <div className='flex justify-center'>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full px-8 py-3 bg-[#619B7F] text-white font-semibold rounded-lg hover:bg-[#4d8268] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
