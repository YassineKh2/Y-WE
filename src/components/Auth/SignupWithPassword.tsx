"use client";
import InputGroup from "@/components/FormElements/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    retypepassword: z.string().min(8),
  })
  .refine((data) => data.password === data.retypepassword, {
    message: "Passwords don't match",
    path: ["retypepassword"],
  });

type FormFields = z.infer<typeof schema>;

export const SignupWithPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
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

          <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};
