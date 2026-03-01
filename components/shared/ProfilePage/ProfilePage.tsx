"use client";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import {
  FiEdit2,
  FiEdit3,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

import { addAddressAction, updateProfileAction } from "@/actions/auth.action";
import type { UserProfile, UserAddress } from "@/types/user";

type ProfilePageProps = {
  initialProfile?: UserProfile | null;
};

const ProfilePage: React.FC<ProfilePageProps> = ({ initialProfile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<UserProfile | null>(
    initialProfile ?? null,
  );

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState<"home" | "office">("home");
  const [addLine1, setAddLine1] = useState<string>("");
  const [addPhone, setAddPhone] = useState<string>("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string>("");

  const memberSince = useMemo(() => {
    if (!profileData?.createdAt) return "-";
    const date = new Date(profileData.createdAt);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString();
  }, [profileData?.createdAt]);

  const addresses = useMemo<UserAddress[]>(() => {
    const list: UserAddress[] = [];

    if (
      (profileData?.homeAddress ?? "").trim() ||
      (profileData?.homePhone ?? "").trim()
    ) {
      list.push({
        id: 1,
        type: "Home",
        isDefault: true,
        line1: profileData?.homeAddress ?? "",
        phone: profileData?.homePhone ?? "",
      });
    }

    if (
      (profileData?.officeAddress ?? "").trim() ||
      (profileData?.officePhone ?? "").trim()
    ) {
      list.push({
        id: 2,
        type: "Office",
        isDefault: list.length === 0,
        line1: profileData?.officeAddress ?? "",
        phone: profileData?.officePhone ?? "",
      });
    }

    return list;
  }, [
    profileData?.homeAddress,
    profileData?.homePhone,
    profileData?.officeAddress,
    profileData?.officePhone,
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Edit profile (name + phone)
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState<string>(profileData?.name ?? "");
  const [editPhone, setEditPhone] = useState<string>(profileData?.phone ?? "");

  const startEdit = () => {
    setEditName(profileData?.name ?? "");
    setEditPhone(profileData?.phone ?? "");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditName(profileData?.name ?? "");
    setEditPhone(profileData?.phone ?? "");
    setAddError("");
  };

  const saveProfile = async () => {
    try {
      setAdding(true);
      setAddError("");
      const response = await updateProfileAction({
        name: editName,
        phone: editPhone,
      });
      setProfileData(response.data ?? profileData);
      setIsEditing(false);
    } catch (err) {
      setAddError(
        err instanceof Error ? err.message : "Failed to save profile",
      );
    } finally {
      setAdding(false);
    }
  };

  const clearAddressField = async (type: "home" | "office") => {
    try {
      setAdding(true);
      const response = await addAddressAction({ type, address: "", phone: "" });
      setProfileData(response.data ?? profileData);
    } catch (error) {
      setAddError(
        error instanceof Error ? error.message : "Failed to remove address",
      );
    } finally {
      setAdding(false);
    }
  };

  const handleAddDone = async () => {
    try {
      setAdding(true);
      setAddError("");

      const response = await addAddressAction({
        type: addType,
        address: addLine1,
        phone: addPhone,
      });

      setProfileData(response.data ?? profileData);
      setShowAddModal(false);
      setAddLine1("");
      setAddPhone("");
      setAddType("home");
    } catch (error) {
      setAddError(
        error instanceof Error ? error.message : "Failed to add address",
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className='min-h-screen  '>
      <div className=' mx-auto flex flex-col gap-5'>
        {/* ── Profile Overview Card ── */}
        <div className='bg-white rounded-lg border border-[#D1CEC6] overflow-hidden'>
          {/* Header */}
          <div className='flex items-center justify-between px-5 py-3.5'>
            <p className='font-medium text-[28px] text-gray-800'>
              Profile Overview
            </p>
            {!isEditing ? (
              <button
                onClick={startEdit}
                className='flex items-center gap-1.5 text-sm font-medium px-6 py-3 rounded transition-colors bg-[#619B7F] hover:bg-[#3d6b4a] text-white'>
                <FiEdit3 size={15} />
                <span className='text-white'>Edit</span>
              </button>
            ) : (
              <div className='flex items-center gap-2'>
                <button
                  onClick={saveProfile}
                  disabled={adding}
                  className='flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded bg-[#619B7F] text-white'>
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={adding}
                  className='flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded bg-gray-200 text-[#1B1B1A]'>
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Body */}
          <div className='p-5'>
            {/* Avatar */}
            <div className='mb-5'>
              <div
                onClick={() => fileInputRef.current?.click()}
                className='w-34 h-34 rounded-full overflow-hidden border-2 border-[#D1CEC6] cursor-pointer mb-1.5'>
                <div>
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt={profileData?.name ?? "Profile"}
                      width={400}
                      height={400}
                      unoptimized
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <Image
                      src={profileData?.profileImage ?? "/user.png"}
                      alt={profileData?.name ?? "Profile"}
                      width={500}
                      height={500}
                    />
                  )}

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
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className=' text-black text-xl font-medium hover:underline'>
                Change Photo
              </button>
            </div>

            {/* Fields Grid */}
            <div className='grid grid-cols-2 gap-x-6 gap-y-3.5'>
              <div>
                <label className='block text-sm text-[#1B1B1A] font-medium mb-1.5'>
                  Full Name
                </label>
                {!isEditing ? (
                  <input
                    value={profileData?.name ?? ""}
                    readOnly
                    className='w-full border border-[#D1CEC6] rounded-lg px-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                  />
                ) : (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className='w-full border border-[#D1CEC6] rounded-lg px-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                  />
                )}
              </div>

              <div>
                <label className='block text-sm text-[#1B1B1A] font-medium mb-1.5'>
                  Email Address
                </label>
                <div className='relative'>
                  <FiMail
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-[#70706C] pointer-events-none'
                    size={13}
                  />
                  <input
                    value={profileData?.email ?? ""}
                    readOnly
                    className='w-full border border-[#D1CEC6] rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm text-[#1B1B1A] font-medium mb-1.5'>
                  Phone Number
                </label>
                <div className='relative'>
                  <FiPhone
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-[#70706C] pointer-events-none'
                    size={13}
                  />
                  {!isEditing ? (
                    <input
                      value={profileData?.phone ?? ""}
                      readOnly
                      className='w-full border border-[#D1CEC6] rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                    />
                  ) : (
                    <input
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className='w-full border border-[#D1CEC6] rounded-lg pl-7 pr-3 py-2 text-sm text-[#70706C]  focus:outline-none focus:border-[#619B7F]'
                    />
                  )}
                </div>
              </div>

              <div>
                <label className='block text-sm text-[#1B1B1A] font-medium mb-1.5'>
                  Member Since
                </label>
                <input
                  value={memberSince}
                  readOnly
                  className='w-full border border-[#D1CEC6] rounded-lg px-3 py-2 text-sm text-[#70706C] focus:outline-none'
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Address Card ── */}
        <div
          id='profileAddress'
          className='bg-white font-medium text-[28px] rounded-lg border border-[#D1CEC6] overflow-hidden'>
          {/* Header */}
          <div className='flex items-center justify-between px-5 py-3.5 '>
            <span className='font-semibold text-[28px] text-gray-800'>
              Address
            </span>
            <button
              onClick={() => {
                setShowAddModal(true);
                setAddError("");
              }}
              disabled={addresses.length >= 2}
              className={`flex items-center gap-1.5 text-sm font-medium px-6 py-3 rounded transition-colors ${
                addresses.length >= 2
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#619B7F] hover:bg-[#3d6b4a] text-white"
              }`}>
              <FiPlus size={15} />
              Add
            </button>
          </div>

          {/* Address List */}
          <div className=''>
            {addresses.length === 0 ? (
              <div className='px-5 py-6 text-sm text-gray-500'>
                No addresses yet.
              </div>
            ) : (
              addresses.map((addr, idx) => (
                <div
                  key={String(addr.id) + idx}
                  className={`px-5 py-2 ${idx < addresses.length - 1 ? " border-[#e8e5de]" : ""}`}>
                  <div className='flex items-start justify-between hover:bg-[#f0f8f5] rounded-md p-3 border border-[#D1CEC6]'>
                    <div>
                      <div className='flex items-center gap-2 mb-2'>
                        <span className='font-semibold text-xl text-gray-800'>
                          {addr.type}
                        </span>
                        {/* {addr.isDefault && (
                          <span className='text-[14px] bg-[#F4F5F3] text-[#619B7F] rounded-3xl px-4 py-0.5'>
                            Default
                          </span>
                        )} */}
                      </div>
                      <div className='flex items-start gap-1.5 mb-1.5'>
                        <FiMapPin
                          className='text-(--primary-text-color) mt-0.5 shrink-0'
                          size={15}
                        />
                        <span className='text-sm text-[#70706C]'>
                          {addr.line1 || "-"}
                        </span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <FiPhone
                          className='text-(--primary-text-color) shrink-0'
                          size={15}
                        />
                        <span className='text-sm text-[#70706C]'>
                          {addr.phone || "-"}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col items-end gap-2'>
                      <div className='flex gap-1.5'>
                        <button
                          onClick={() => {
                            const t =
                              (addr.type || "").toLowerCase() === "home"
                                ? "home"
                                : "office";
                            setAddType(t as "home" | "office");
                            setAddLine1(addr.line1 ?? "");
                            setAddPhone(addr.phone ?? "");
                            setAddError("");
                            setShowAddModal(true);
                          }}
                          className='flex items-center justify-center rounded-md p-1.5 text-[#1B1B1A] hover:bg-gray-50 transition-colors'>
                          <FiEdit2 size={13} />
                        </button>

                        <button
                          onClick={() =>
                            clearAddressField(
                              (addr.type || "").toLowerCase() === "home"
                                ? "home"
                                : "office",
                            )
                          }
                          className='flex items-center justify-center rounded-md p-1.5 text-[#E24949] hover:border-red-200 hover:text-red-500 transition-colors'
                          disabled={adding}>
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {showAddModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
            <div className='bg-white rounded-lg p-6 w-full max-w-md'>
              <h3 className='text-lg font-semibold mb-4'>Add Address</h3>

              {/* Tab bar */}
              <div className='flex border border-[#D1CEC6] rounded-md overflow-hidden mb-4'>
                <button
                  onClick={() => setAddType("home")}
                  className={`flex-1 py-2 text-sm ${addType === "home" ? "bg-[#619B7F] text-white" : "bg-white text-[#1B1B1A]"}`}>
                  Home
                </button>
                <button
                  onClick={() => setAddType("office")}
                  className={`flex-1 py-2 text-sm ${addType === "office" ? "bg-[#619B7F] text-white" : "bg-white text-[#1B1B1A]"}`}>
                  Office
                </button>
              </div>

              <div className='flex flex-col gap-3'>
                <label className='text-sm text-[#1B1B1A]'>
                  {addType === "home" ? "Home Address" : "Office Address"}{" "}
                  (optional)
                </label>
                <input
                  value={addLine1}
                  onChange={(e) => setAddLine1(e.target.value)}
                  className='border border-[#D1CEC6] p-2 rounded'
                  placeholder='Address line'
                />

                <label className='text-sm text-[#1B1B1A]'>
                  {addType === "home"
                    ? "Home Phone Number"
                    : "Office Phone Number"}{" "}
                  (optional)
                </label>
                <input
                  value={addPhone}
                  onChange={(e) => setAddPhone(e.target.value)}
                  className='border border-gray-200 p-2 rounded'
                  placeholder='Phone number'
                />
              </div>

              {addError && (
                <p className='text-sm text-red-500 mt-3'>{addError}</p>
              )}

              <div className='flex justify-end gap-2 mt-5'>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setAddLine1("");
                    setAddPhone("");
                    setAddError("");
                  }}
                  className='px-3 py-1.5 text-sm'
                  disabled={adding}>
                  Cancel
                </button>
                <button
                  onClick={handleAddDone}
                  className='px-4 py-2 bg-[#619B7F] text-white rounded text-sm'
                  disabled={adding}>
                  {adding ? "Saving..." : "Done"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
