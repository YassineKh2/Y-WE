"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import AlertError from "@/components/Alerts/AlertError";
import { Register } from "@/lib/ZodSchemas";

type FormFields = z.infer<typeof Register>;

export const SignupWithPassword = () => {
  const [errorToast, setErrorToast] = useState({
    state: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(Register),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const response = await fetch("api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6.5">
          <InputGroup
            label="Name"
            type="text"
            placeholder="Enter full name"
            customClasses="mb-4.5"
            register={register}
            error={errors.name}
          />

          <InputGroup
            label="Email"
            type="email"
            placeholder="Enter email address"
            customClasses="mb-4.5"
            register={register}
            error={errors.email}
          />

          <InputGroup
            label="Password"
            type="password"
            placeholder="Enter password"
            customClasses="mb-4.5"
            register={register}
            error={errors.password}
          />

          <InputGroup
            label="Re-type Password"
            type="password"
            placeholder="Re-enter"
            customClasses="mb-5.5"
            register={register}
            error={errors.retypepassword}
          />

          <button
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
          >
            Sign Up
          </button>
        </div>
      </form>
      {errorToast.state && <AlertError error={errorToast.message} />}
    </>
  );
};
