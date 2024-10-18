"use client";

import GoogleSigninButton from "@/components/Auth/GoogleSigninButton";
import SigninWithPassword from "@/components/Auth/SigninWithPassword";
import Link from "next/link";
import React from "react";
import { SignupWithPassword } from "@/components/Auth/SignupWithPassword";

export const Singup = () => {
  return (
    <>
      <GoogleSigninButton text="Sign Up" />

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Or sign up with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SignupWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Have an account?{" "}
          <Link href="/signin" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default Singup;