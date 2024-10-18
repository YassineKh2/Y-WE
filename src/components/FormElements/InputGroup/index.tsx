import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputGroupProps {
  customClasses?: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  register?: UseFormRegister<any>;
  error?: FieldError;
}

const InputGroup: React.FC<InputGroupProps> = ({
  customClasses,
  label,
  type,
  placeholder,
  required,
  register,
  error,
}) => {
  return (
    <>
      <div className={customClasses}>
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          {label}
          {required && <span className="text-red">*</span>}
        </label>
        <input
          {...(register &&
            register(label.toLowerCase().replace(/[^a-z0-9]/g, "")))}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
        {error && (
          <span className="mt-1 block text-xs text-red">{error.message}</span>
        )}
      </div>
    </>
  );
};

export default InputGroup;
