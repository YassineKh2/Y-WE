"use client";
import React, { useState } from "react";
import AlertError from "@/components/Alerts/AlertError";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Credentials } from "@/lib/ZodSchemas";
import { z } from "zod";
import { SettingsSidebar } from "@/components/Settings/SettingsSidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AlertSuccess from "@/components/Alerts/AlertSuccess";
import { reloadSession } from "@/lib/funcs";

type FormFields = z.infer<typeof Credentials>;

const SettingBoxes = () => {
  const [errorToast, setErrorToast] = useState({
    state: false,
    message: "",
  });
  const [successToast, setSuccessToast] = useState({
    state: false,
    message: "",
  });
  const { data: session, update } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(Credentials),
    defaultValues: {
      email: session?.user?.email ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (data.email === session?.user?.email && !data.password) {
      setErrorToast({
        state: true,
        message: "Email is same as previous",
      });
      setTimeout(() => {
        setErrorToast({
          state: false,
          message: "",
        });
      }, 5000);
      return;
    }
    const response = await fetch("/api/user/credentials", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!responseData.error) {
      //Set toast
      setSuccessToast({
        state: true,
        message: responseData.success,
      });
      setTimeout(() => {
        setSuccessToast({
          state: false,
          message: "",
        });
      }, 5000);

      //Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          email: data.email,
        },
      });

      await reloadSession();
    }

    if (responseData.error) {
      setErrorToast({
        state: true,
        message: responseData.error,
      });
      setTimeout(() => {
        setErrorToast({
          state: false,
          message: "",
        });
      }, 5000);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="fullName"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              opacity="0.5"
                              d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
                              fill="#1C274C"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
                              fill="#1C274C"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"
                              fill="#1C274C"
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="password"
                        id="name"
                        {...register("password")}
                        placeholder="****"
                      />
                      {errors.password && (
                        <span className="mt-1 block text-xs text-red">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Retype Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              opacity="0.5"
                              d="M3.17157 18.8284C4.34315 20 6.22876 20 10 20H12L15 19.9991C18.1143 19.99 19.7653 19.8915 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.7653 4.10848 18.1143 4.01004 15 4.00093L12 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284Z"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
                              fill="#1C274C"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
                              fill="#1C274C"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15 2V22"
                              stroke="#1C274C"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </g>
                        </svg>
                      </span>

                      <input
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="password"
                        {...register("retypepassword")}
                        id="retypepassword"
                        placeholder="****"
                      />

                      {errors.retypepassword && (
                        <span className="mt-1 block text-xs text-red">
                          {errors.retypepassword.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                    htmlFor="Email"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <g id="style=linear">
                            <g id="email">
                              <path
                                id="vector"
                                d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                                stroke="#6b7280"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                              <path
                                id="vector_2"
                                d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
                                stroke="#6b7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <input
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-12.5 pr-4.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      type="email"
                      {...register("email")}
                      id="email"
                      placeholder="devidjhon24@email.com"
                    />
                    {errors.email && (
                      <span className="mt-1 block text-xs text-red">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Link
                    href="/"
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                  >
                    Cancel
                  </Link>
                  <button
                    className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="my-5 rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <p className="py-2 text-xl font-semibold">Delete Account</p>
            <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Proceed with caution
            </p>
            <p className="mt-2">
              Make sure you have taken backup of your account in case you ever
              need to get access to your data. We will completely wipe your
              data. There is no way to access your account after this action.
            </p>
            <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2 hover:animate-pulse">
              Continue with deletion
            </button>
          </div>
        </div>
        <SettingsSidebar />
      </div>

      {errorToast.state && <AlertError error={errorToast.message} />}
      {successToast.state && <AlertSuccess message={successToast.message} />}
    </>
  );
};

export default SettingBoxes;
