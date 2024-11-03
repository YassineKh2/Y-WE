"use client";
import React, { useState } from "react";
import AlertError from "@/components/Alerts/AlertError";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event } from "@/lib/ZodSchemas";
import { z } from "zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AlertSuccess from "@/components/Alerts/AlertSuccess";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Input, Textarea } from "@nextui-org/input";
import { parseAbsoluteToLocal } from "@internationalized/date";

type FormFields = z.infer<typeof Event>;

const AddEvent = () => {
  const [errorToast, setErrorToast] = useState({
    state: false,
    message: "",
  });
  const [successToast, setSuccessToast] = useState({
    state: false,
    message: "",
  });

  const [date, setDate] = useState({
    start: parseAbsoluteToLocal("2021-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2021-04-14T19:15:22Z"),
  });

  const { data: session, update } = useSession();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(Event),
  });

  function ErrorToast(error: any) {
    setErrorToast({
      state: true,
      message: error,
    });
    setTimeout(() => {
      setErrorToast({
        state: false,
        message: "",
      });
    }, 5000);
  }

  function SuccessToast(success: any) {
    setSuccessToast({
      state: true,
      message: success,
    });
    setTimeout(() => {
      setSuccessToast({
        state: false,
        message: "",
      });
    }, 5000);
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log("data");
    // const response = await fetch("/api/user/credentials", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // });
    //
    // const responseData = await response.json();
    //
    // if (!responseData.error) {
    //   SuccessToast(responseData.success);
    // }
    //
    // if (responseData.error) {
    //   ErrorToast(responseData.error);
    // }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Add Event
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <Input
                      {...register("name")}
                      errorMessage={errors.name?.message}
                      isInvalid={!!errors.name?.message}
                      isClearable
                      classNames={{
                        input:
                          "placeholder:text-gray-400/80 dark:placeholder:text-white/20",
                      }}
                      type="name"
                      label="Name"
                      isRequired
                      labelPlacement="outside"
                      startContent={
                        <svg
                          className="mr-2 fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 1024 1024"
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
                              d="M676 862c-16 0-28-13-28-29V691c0-16 12-28 28-28h142c16 0 29 12 29 28v142c0 16-13 29-29 29H676zm142-171H676v142h142V691zM960 96c35 0 64 29 64 64v800c0 35-29 64-64 64H64c-35 0-64-29-64-64V160c0-35 29-64 64-64h256V32c0-18 14-32 32-32s32 14 32 32v64h256V32c0-18 14-32 32-32s32 14 32 32v64h256zM64 960h896V160H704v32c0 18-14 32-32 32s-32-14-32-32v-32H384v32c0 18-14 32-32 32s-32-14-32-32v-32H64v800z"
                            ></path>
                          </g>
                        </svg>
                      }
                      variant="bordered"
                      placeholder="My Sick Party"
                      size={"lg"}
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <DateRangePicker
                      granularity="hour"
                      label={"Duration"}
                      isRequired
                      variant="bordered"
                      labelPlacement="outside"
                      size={"lg"}
                      visibleMonths={2}
                      value={date}
                      onChange={setDate}
                    />
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <Input
                      {...register("estimatedAttendees")}
                      errorMessage={errors.estimatedAttendees?.message}
                      isInvalid={!!errors.estimatedAttendees?.message}
                      isClearable
                      type="number"
                      label="Estimated Attendees"
                      isRequired
                      classNames={{
                        input:
                          "placeholder:text-gray-400/60 dark:placeholder:text-white/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                      }}
                      labelPlacement="outside"
                      startContent={
                        <svg
                          className="mr-2 fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
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
                              d="M16 6C14.3432 6 13 7.34315 13 9C13 10.6569 14.3432 12 16 12C17.6569 12 19 10.6569 19 9C19 7.34315 17.6569 6 16 6ZM11 9C11 6.23858 13.2386 4 16 4C18.7614 4 21 6.23858 21 9C21 10.3193 20.489 11.5193 19.6542 12.4128C21.4951 13.0124 22.9176 14.1993 23.8264 15.5329C24.1374 15.9893 24.0195 16.6114 23.5631 16.9224C23.1068 17.2334 22.4846 17.1155 22.1736 16.6591C21.1979 15.2273 19.4178 14 17 14C13.166 14 11 17.0742 11 19C11 19.5523 10.5523 20 10 20C9.44773 20 9.00001 19.5523 9.00001 19C9.00001 18.308 9.15848 17.57 9.46082 16.8425C9.38379 16.7931 9.3123 16.7323 9.24889 16.6602C8.42804 15.7262 7.15417 15 5.50001 15C3.84585 15 2.57199 15.7262 1.75114 16.6602C1.38655 17.075 0.754692 17.1157 0.339855 16.7511C-0.0749807 16.3865 -0.115709 15.7547 0.248886 15.3398C0.809035 14.7025 1.51784 14.1364 2.35725 13.7207C1.51989 12.9035 1.00001 11.7625 1.00001 10.5C1.00001 8.01472 3.01473 6 5.50001 6C7.98529 6 10 8.01472 10 10.5C10 11.7625 9.48013 12.9035 8.64278 13.7207C9.36518 14.0785 9.99085 14.5476 10.5083 15.0777C11.152 14.2659 11.9886 13.5382 12.9922 12.9945C11.7822 12.0819 11 10.6323 11 9ZM3.00001 10.5C3.00001 9.11929 4.1193 8 5.50001 8C6.88072 8 8.00001 9.11929 8.00001 10.5C8.00001 11.8807 6.88072 13 5.50001 13C4.1193 13 3.00001 11.8807 3.00001 10.5Z"
                              fill="#6b7280"
                            ></path>
                          </g>
                        </svg>
                      }
                      variant="bordered"
                      placeholder="200"
                      size={"lg"}
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <Input
                      {...register("askedAmount")}
                      errorMessage={errors.askedAmount?.message}
                      isInvalid={!!errors.askedAmount?.message}
                      type="number"
                      label="Asked Amount"
                      isRequired
                      classNames={{
                        input:
                          "placeholder:text-gray-400/60 dark:placeholder:text-white/20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                      }}
                      labelPlacement="outside"
                      startContent={
                        <svg
                          className="mr-2 fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 1024 1024"
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
                              fill="#6b7280"
                              d="M256 640v192h640V384H768v-64h150.976c14.272 0 19.456 1.472 24.64 4.288a29.056 29.056 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64v493.952c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H233.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096c-2.688-5.184-4.224-10.368-4.224-24.576V640h64z"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              fill="#6b7280"
                              d="M768 192H128v448h640V192zm64-22.976v493.952c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096C65.536 682.432 64 677.248 64 663.04V169.024c0-14.272 1.472-19.456 4.288-24.64a29.056 29.056 0 0 1 12.096-12.16C85.568 129.536 90.752 128 104.96 128h685.952c14.272 0 19.456 1.472 24.64 4.288a29.056 29.056 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64z"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              fill="#6b7280"
                              d="M448 576a160 160 0 1 1 0-320 160 160 0 0 1 0 320zm0-64a96 96 0 1 0 0-192 96 96 0 0 0 0 192z"
                            ></path>
                          </g>
                        </svg>
                      }
                      variant="bordered"
                      placeholder="5000"
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            د.ت
                          </span>
                        </div>
                      }
                      size={"lg"}
                    />
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <Input
                      {...register("type")}
                      errorMessage={errors.type?.message}
                      isInvalid={!!errors.type?.message}
                      isClearable
                      type="text"
                      label="Type of the event"
                      isRequired
                      classNames={{
                        input:
                          "placeholder:text-gray-400/60 dark:placeholder:text-white/20 focus-blue-500",
                      }}
                      labelPlacement="outside"
                      startContent={
                        <svg
                          className="mr-2 fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <g>
                              <path
                                className="st0"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M486.653,242.047L512,240.851v-79.563c0-36.038-29.315-65.353-65.349-65.353H65.349 C29.315,95.935,0,125.251,0,161.288v77.61l22.821,3.274c6.836,0.976,11.996,6.927,11.996,13.831 c0,6.904-5.156,12.847-11.989,13.824L0,273.095v77.624c0,36.031,29.315,65.346,65.349,65.346h381.302 c36.034,0,65.349-29.315,65.349-65.346v-79.585l-25.356-1.181c-7.475-0.354-13.331-6.478-13.331-13.949 C473.314,248.534,479.174,242.401,486.653,242.047z M478.954,302.276v48.443c0,17.807-14.493,32.299-32.302,32.299H65.349 c-17.81,0-32.302-14.492-32.302-32.299v-49.317c20.2-5.456,34.818-24.065,34.818-45.398c0-21.325-14.618-39.942-34.818-45.406 v-49.31c0-17.814,14.493-32.306,32.302-32.306h381.302c17.81,0,32.302,14.493,32.302,32.306v48.436 c-22.132,3.96-38.686,23.214-38.686,46.279C440.267,279.069,456.822,298.323,478.954,302.276z"
                              ></path>
                              <polygon
                                className="st0"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                points="130.218,330.245 122.157,330.245 122.157,365.015 130.218,365.015 135.488,365.015 143.549,365.015 143.549,330.245 135.488,330.245"
                              ></polygon>
                              <polygon
                                className="st0"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                points="130.218,269.158 122.157,269.158 122.157,303.929 130.218,303.929 135.488,303.929 143.549,303.929 143.549,269.158 135.488,269.158"
                              ></polygon>
                              <polygon
                                className="st0"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                points="130.218,208.064 122.157,208.064 122.157,242.842 130.218,242.842 135.488,242.842 143.549,242.842 143.549,208.064 135.488,208.064"
                              ></polygon>
                              <polygon
                                className="st0"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                points="130.218,146.985 122.157,146.985 122.157,181.756 130.218,181.756 135.488,181.756 143.549,181.756 143.549,146.985 135.488,146.985"
                              ></polygon>
                            </g>
                          </g>
                        </svg>
                      }
                      variant="bordered"
                      placeholder="A Party"
                      size={"lg"}
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <Input
                      {...register("location")}
                      errorMessage={errors.location?.message}
                      isInvalid={!!errors.location?.message}
                      isClearable
                      description="Please enter the full location"
                      type="text"
                      label="Location"
                      isRequired
                      classNames={{
                        input:
                          "placeholder:text-gray-400/60 dark:placeholder:text-white/20",
                      }}
                      labelPlacement="outside"
                      startContent={
                        <svg
                          className="mr-2"
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
                              d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                              stroke="#6b7280"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </g>
                        </svg>
                      }
                      variant="bordered"
                      placeholder="Hotel Laico"
                      size={"lg"}
                    />
                  </div>
                </div>
                <div className="mb-5.5">
                  <Textarea
                    {...register("description")}
                    errorMessage={errors.description?.message}
                    isInvalid={!!errors.description?.message}
                    label="Description"
                    description="A maximum of 500 characters"
                    variant="bordered"
                    classNames={{
                      input:
                        "placeholder:text-gray-400 dark:placeholder:text-white/20",
                    }}
                    isRequired
                    labelPlacement="outside"
                    placeholder="Describe your event with detail ! "
                    startContent={
                      <svg
                        className="mr-2 fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.95153 1.0415L11.2493 1.0415C11.5945 1.0415 11.8743 1.32133 11.8743 1.6665C11.8743 2.01168 11.5945 2.2915 11.2493 2.2915H9.99935C8.01749 2.2915 6.59398 2.29283 5.51066 2.43848C4.44533 2.58171 3.80306 2.85412 3.32835 3.32883C2.85363 3.80355 2.58122 4.44582 2.43799 5.51115C2.29234 6.59447 2.29102 8.01798 2.29102 9.99984C2.29102 11.9817 2.29234 13.4052 2.43799 14.4885C2.58122 15.5539 2.85363 16.1961 3.32835 16.6708C3.80306 17.1456 4.44533 17.418 5.51066 17.5612C6.59398 17.7068 8.01749 17.7082 9.99935 17.7082C11.9812 17.7082 13.4047 17.7068 14.488 17.5612C15.5534 17.418 16.1956 17.1456 16.6704 16.6708C17.1451 16.1961 17.4175 15.5539 17.5607 14.4885C17.7064 13.4052 17.7077 11.9817 17.7077 9.99984V8.74984C17.7077 8.40466 17.9875 8.12484 18.3327 8.12484C18.6779 8.12484 18.9577 8.40466 18.9577 8.74984V10.0476C18.9577 11.9713 18.9577 13.4788 18.7996 14.6551C18.6377 15.859 18.2999 16.809 17.5542 17.5547C16.8086 18.3004 15.8585 18.6382 14.6546 18.8C13.4784 18.9582 11.9708 18.9582 10.0472 18.9582H9.95154C8.02788 18.9582 6.52034 18.9582 5.3441 18.8C4.14016 18.6382 3.19014 18.3004 2.44446 17.5547C1.69879 16.809 1.361 15.859 1.19914 14.6551C1.041 13.4788 1.04101 11.9713 1.04102 10.0477V9.95202C1.04101 8.02836 1.041 6.52083 1.19914 5.34459C1.361 4.14065 1.69879 3.19063 2.44446 2.44495C3.19014 1.69928 4.14016 1.36149 5.3441 1.19963C6.52034 1.04148 8.02787 1.04149 9.95153 1.0415ZM13.9748 1.89643C15.1147 0.756528 16.9628 0.756528 18.1028 1.89643C19.2427 3.03634 19.2427 4.88449 18.1028 6.02439L12.5627 11.5645C12.2533 11.8739 12.0595 12.0678 11.8432 12.2365C11.5884 12.4352 11.3128 12.6055 11.0211 12.7445C10.7735 12.8625 10.5135 12.9492 10.0983 13.0875L7.6779 13.8943C7.23103 14.0433 6.73835 13.927 6.40528 13.5939C6.0722 13.2608 5.95589 12.7682 6.10485 12.3213L6.91166 9.90086C7.05001 9.48572 7.13667 9.22566 7.25468 8.97805C7.39367 8.6864 7.56402 8.41077 7.76272 8.15602C7.93142 7.93973 8.12527 7.74591 8.43472 7.4365L13.9748 1.89643ZM17.2189 2.78032C16.5671 2.12857 15.5104 2.12857 14.8587 2.78032L14.5448 3.09417C14.5637 3.17405 14.5902 3.26923 14.627 3.37539C14.7465 3.71961 14.9725 4.17293 15.3994 4.59983C15.8263 5.02673 16.2796 5.25272 16.6238 5.37215C16.73 5.40898 16.8251 5.43544 16.905 5.45436L17.2189 5.14051C17.8706 4.48876 17.8706 3.43207 17.2189 2.78032ZM15.9203 6.43908C15.4903 6.25417 14.9895 5.95772 14.5155 5.48372C14.0415 5.00971 13.745 4.50886 13.5601 4.07888L9.34727 8.29172C9.00018 8.63881 8.86405 8.77647 8.74836 8.92479C8.6055 9.10795 8.48302 9.30613 8.38308 9.51582C8.30215 9.68564 8.23991 9.86895 8.08469 10.3346L7.72477 11.4144L8.58482 12.2744L9.66456 11.9145C10.1302 11.7593 10.3136 11.697 10.4834 11.6161C10.6931 11.5162 10.8912 11.3937 11.0744 11.2508C11.2227 11.1351 11.3604 10.999 11.7075 10.6519L15.9203 6.43908Z"
                          fill=""
                        />
                      </svg>
                    }
                  />
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
        </div>
      </div>

      {errorToast.state && <AlertError error={errorToast.message} />}
      {successToast.state && <AlertSuccess message={successToast.message} />}
    </>
  );
};

export default AddEvent;
