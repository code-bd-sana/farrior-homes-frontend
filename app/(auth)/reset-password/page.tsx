"use client";

import { useResetPasswordMutation } from "@/actions/hooks/auth.hooks";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";
import bgImage from "../../../public/signup.png";

function ResetPasswordPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordMutation = useResetPasswordMutation({
    onSuccess: () => {
      router.push("/login?passwordChanged=1");
    },
  });

  const validationError = useMemo(() => {
    if (!token) {
      return "Reset token is missing. Please request a new reset link.";
    }
    if (newPassword && newPassword.length < 6) {
      return "New password must be at least 6 characters.";
    }
    if (confirmPassword && newPassword !== confirmPassword) {
      return "New password and confirm password do not match.";
    }
    return "";
  }, [token, newPassword, confirmPassword]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validationError) {
      return;
    }

    resetPasswordMutation.mutate({
      token,
      newPassword,
      confirmNewPassword: confirmPassword,
    });
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center relative'>
      <div className='absolute inset-0 z-10'>
        <Image
          src={bgImage}
          alt='Reset Password Background'
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
          Reset Password
        </h1>
        <p className='text-sm text-gray-600 mb-6'>
          Set a new password for your account.
        </p>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-[#1B1B1A] mb-2'>
            New Password
          </label>
          <div className='flex items-center border border-[#D1CEC6] rounded-md px-3 py-2.5 gap-2 focus-within:border-green-500 transition-colors'>
            <LuLock className='w-4 h-4 text-[#2C2C2A] shrink-0' />
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Enter your new password'
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
              autoComplete='new-password'
              disabled={resetPasswordMutation.isPending}
              className='flex-1 text-sm text-gray-500 placeholder-gray-400 outline-none bg-transparent disabled:opacity-50'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='text-gray-400 hover:text-gray-600'
              disabled={resetPasswordMutation.isPending}>
              {showPassword ? (
                <LuEyeOff className='w-4 h-4 text-[#2C2C2A]' />
              ) : (
                <LuEye className='w-4 h-4 text-[#2C2C2A]' />
              )}
            </button>
          </div>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-[#1B1B1A] mb-2'>
            Confirm New Password
          </label>
          <div className='flex items-center border border-[#D1CEC6] rounded-md px-3 py-2.5 gap-2 focus-within:border-green-500 transition-colors'>
            <LuLock className='w-4 h-4 text-[#2C2C2A] shrink-0' />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder='Confirm your new password'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              autoComplete='new-password'
              disabled={resetPasswordMutation.isPending}
              className='flex-1 text-sm text-gray-500 placeholder-gray-400 outline-none bg-transparent disabled:opacity-50'
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='text-gray-400 hover:text-gray-600'
              disabled={resetPasswordMutation.isPending}>
              {showConfirmPassword ? (
                <LuEyeOff className='w-4 h-4 text-[#2C2C2A]' />
              ) : (
                <LuEye className='w-4 h-4 text-[#2C2C2A]' />
              )}
            </button>
          </div>
        </div>

        {validationError && (
          <p className='mb-4 text-sm text-red-600'>{validationError}</p>
        )}

        {resetPasswordMutation.isError && (
          <p className='mb-4 text-sm text-red-600'>
            {resetPasswordMutation.error.message ||
              "Failed to reset password. Please request a new link."}
          </p>
        )}

        <button
          type='submit'
          disabled={Boolean(validationError) || resetPasswordMutation.isPending}
          className='w-full px-6 py-2.5 bg-[#619B7F] text-xl text-white rounded-lg hover:bg-[#3a6a50] transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70'>
          {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center text-xl'>
          Loading...
        </div>
      }>
      <ResetPasswordPageContent />
    </Suspense>
  );
}
