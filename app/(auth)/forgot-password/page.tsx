"use client";

import { useForgotPasswordMutation } from "@/actions/hooks/auth.hooks";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import bgImage from "../../../public/signup.png";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const forgotPasswordMutation = useForgotPasswordMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    forgotPasswordMutation.mutate({ email });
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center relative'>
      <div className='absolute inset-0 z-10'>
        <Image
          src={bgImage}
          alt='Forgot Password Background'
          fill
          className='object-cover object-center opacity-100'
          priority
        />
      </div>

      <div className='absolute top-6 left-6 flex items-center gap-2'>
        <Image
          src='/logo.png'
          alt='Farrior Homes'
          width={200}
          height={80}
          priority
          className='h-15 w-auto object-contain z-10'
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-lg w-full max-w-md mx-4 px-8 py-8 border border-[#D1CEC6] z-10 relative'>
        <h1 className='text-2xl font-semibold text-[#1B1B1A] mb-2'>
          Forgot Password
        </h1>
        <p className='text-sm text-gray-600 mb-6'>
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-[#1B1B1A] mb-2'>
            Email Address
          </label>
          <div className='flex items-center border border-[#D1CEC6] rounded-md px-3 py-2.5 gap-2 focus-within:border-green-500 transition-colors'>
            <MdOutlineEmail className='w-4 h-4 text-[#2C2C2A] shrink-0' />
            <input
              type='email'
              placeholder='you@example.com'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete='email'
              disabled={forgotPasswordMutation.isPending}
              className='flex-1 text-sm text-gray-500 placeholder-gray-400 outline-none bg-transparent disabled:opacity-50'
            />
          </div>
        </div>

        {forgotPasswordMutation.isSuccess && (
          <p className='mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded px-4 py-2'>
            {forgotPasswordMutation.data.message}
          </p>
        )}

        {forgotPasswordMutation.isError && (
          <p className='mb-4 text-sm text-red-600'>
            {forgotPasswordMutation.error.message ||
              "Failed to send reset link. Please try again."}
          </p>
        )}

        <button
          type='submit'
          disabled={forgotPasswordMutation.isPending}
          className='w-full px-6 py-2.5 bg-[#619B7F] text-xl text-white rounded-lg hover:bg-[#3a6a50] transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70'>
          {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
        </button>

        <div className='mt-4 text-center'>
          <Link
            href='/login'
            className='text-sm text-green-600 hover:underline'>
            Back to login
          </Link>
        </div>
      </form>

      <div className='mt-6 flex items-center gap-2 text-gray-600 text-sm cursor-pointer hover:text-gray-800 transition-colors z-10'>
        <ArrowLeft className='w-4 h-4' />
        <Link href='/' className='hover:underline'>
          Back to home
        </Link>
      </div>
    </div>
  );
}
