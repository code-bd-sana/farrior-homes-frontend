"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import {
  FiEdit2,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

interface Address {
  id: number;
  type: string;
  isDefault: boolean;
  line1: string;
  phone: string;
}

const ProfilePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [fullName, setFullName] = useState("hawkbait@example.com");
  const [email, setEmail] = useState("youremail@example.com");
  const [phone, setPhone] = useState("+995");
  const [website, setWebsite] = useState("https://www.farmhames.com");
  const [facebook, setFacebook] = useState("https://www.facebook.com/");
  const [instagram, setInstagram] = useState("https://www.instagram.com/");
  const [twitter, setTwitter] = useState("https://www.twitter.com/");
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/");

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Home",
      isDefault: true,
      line1: "123 Main Road Rampura, Dhaka 1285, Bangladesh",
      phone: "+8801315-413441",
    },
    {
      id: 2,
      type: "Office",
      isDefault: false,
      line1: "123 Main Road Rampura, Dhaka 1285, Bangladesh",
      phone: "+8801315-413440",
    },
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const setDefault = (id: number) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className='min-h-screen  '>
      <div className=' mx-auto flex flex-col gap-5'>
        {/* ── Profile Overview Card ── */}
        <div className='bg-white rounded border border-[#e8e5de] overflow-hidden'>
          {/* Header */}
          <div className='flex items-center justify-between px-5 py-3.5 '>
            <span className='font-medium text-[28px] text-gray-800'>
              Profile Overview
            </span>
            <button className='flex items-center gap-1.5 bg-[#619B7F] hover:bg-[#3d6b4a] text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors'>
              <FiEdit2 size={12} />
              Edit
            </button>
          </div>

          {/* Body */}
          <div className='p-5'>
            {/* Avatar */}
            <div className='mb-5'>
              <div
                onClick={() => fileInputRef.current?.click()}
                className='w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer mb-1.5'>
                <div>
                  <Image
                    src='/user.png'
                    alt='Profile'
                    width={200}
                    height={200}
                  />

                  <FaCamera className='' size={12} />
                </div>
                {/* {profileImage ? (
                  <div>
                    <Image
                      src='/user.png'
                      alt='Profile'
                      width={200}
                      height={200}
                    />

                    <FaCamera className='' size={12} />
                  </div>
                ) : (
                  <div
                    className='w-full h-full flex items-center justify-center text-xl'
                    style={{
                      background:
                        "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
                    }}>
                    👤
                  </div>
                )} */}
              </div>
              {/* <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageChange}
              /> */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className='text-xs text-black text-[22px]  font-medium hover:underline'>
                Change Photo
              </button>
            </div>

            {/* Fields Grid */}
            <div className='grid grid-cols-2 gap-x-6 gap-y-3.5'>
              {/* Full Name */}
              <div>
                <label className='block text-xs text-[#1B1B1A] font-medium mb-1.5'>
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder='Full Name'
                  className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                />
              </div>

              {/* Email */}
              <div>
                <label className='block text-xs text-[#1B1B1A] font-medium mb-1.5'>
                  Email Address
                </label>
                <div className='relative'>
                  <FiMail
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    size={13}
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    className='w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className='block text-xs text-[#1B1B1A] font-medium mb-1.5'>
                  Phone Number
                </label>
                <div className='relative'>
                  <FiPhone
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    size={13}
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='+995'
                    className='w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label className='block text-xs text-[#1B1B1A] font-medium mb-1.5'>
                  Website
                </label>
                <div className='relative'>
                  <FiGlobe
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    size={13}
                  />
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder='https://'
                    className='w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                  />
                </div>
              </div>

              {/* Facebook */}
              <div>
                <label className='block text-xs text-[#1B1B1A] font-medium mb-1.5'>
                  Facebook
                </label>
                <div className='relative'>
                  <FaFacebookF
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    size={12}
                  />
                  <input
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder='https://facebook.com/'
                    className='w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C] focus:outline-none focus:border-[#619B7F]'
                  />
                </div>
              </div>

              {/* Instagram */}
              <div>
                <label className='block text-xs text-[#1B1B1A] font-medium mb-1.5'>
                  Instagram
                </label>
                <div className='relative'>
                  <FaInstagram
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    size={13}
                  />
                  <input
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder='https://instagram.com/'
                    className='w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                  />
                </div>
              </div>

              {/* Twitter */}
              <div>
                <label className='block text-xs text-[#1B1B1A] font-medium mb-1.5'>
                  Twitter
                </label>
                <div className='relative'>
                  <FaTwitter
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    size={13}
                  />
                  <input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder='https://twitter.com/'
                    className='w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div>
                <label className='block text-xs text-[#1B1B1A] font-medium mb-1.5'>
                  LinkedIn
                </label>
                <div className='relative'>
                  <FaLinkedinIn
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    size={13}
                  />
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder='https://linkedin.com/'
                    className='w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Address Card ── */}
        <div className='bg-white rounded font-medium text-[28px] border border-[#e8e5de] overflow-hidden'>
          {/* Header */}
          <div className='flex items-center justify-between px-5 py-3.5 '>
            <span className='font-semibold text-[15px] text-gray-800'>
              Address
            </span>
            <button className='flex items-center gap-1.5 bg-[#619B7F] hover:bg-[#3d6b4a] text-white text-xs font-medium px-4 py-1.5 rounded transition-colors'>
              <FiPlus size={13} />
              Add
            </button>
          </div>

          {/* Address List */}
          <div className="py-6">
            {addresses.map((addr, idx) => (
              <div
                key={addr.id}
                className={`px-5 py-2 ${idx < addresses.length - 1 ? " border-[#e8e5de]" : ""}`}>
                <div
                  className={`flex items-start justify-between hover:bg-[#f0f8f5] rounded-md p-3 border border-[#D1CEC6]`}>
                  {/* Left */}
                  <div>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='font-semibold text-sm text-gray-800'>
                        {addr.type}
                      </span>
                      {addr.isDefault && (
                        <span className='text-[14px] bg-[#F4F5F3]   text-[#619B7F]  rounded-3xl px-4 py-0.5 '>
                          Default
                        </span>
                      )}
                    </div>
                    <div className='flex items-start gap-1.5 mb-1.5'>
                      <FiMapPin
                        className='text-gray-400 mt-0.5 shrink-0'
                        size={13}
                      />
                      <span className='text-xs text-[#70706C]'>
                        {addr.line1}
                      </span>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      <FiPhone className='text-gray-400 shrink-0' size={13} />
                      <span className='text-xs text-[#70706C]'>
                        {addr.phone}
                      </span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className='flex flex-col items-end gap-2'>
                    <div className='flex gap-1.5'>
                      <button className='flex items-center justify-center  rounded-md p-1.5 text-[#1B1B1A] hover:bg-gray-50 transition-colors'>
                        <FiEdit2 size={13} />
                      </button>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className='flex items-center justify-center  rounded-md p-1.5 text-[#E24949] hover:border-red-200 hover:text-red-500 transition-colors'>
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefault(addr.id)}
                        className='text-[14px] text-white bg-[#619B7F] hover:bg-[#3d6b4a] px-4 py-2 rounded-md  transition-colors whitespace-nowrap'>
                        Set to Default
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
