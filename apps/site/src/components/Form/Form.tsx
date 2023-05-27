import { FC, useEffect, useRef, useState } from "react";
import { FormSubmit } from "../../types";

const Form: FC<{
  label: string;
  submitLabel: string;
  initialValue: HTMLInputElement["value"];
  onSubmit: FormSubmit;
  loading?: boolean;
  inline?: boolean;
  disabled?: boolean;
  success?: boolean;
  failure?: boolean;
  error?: string;
}> = ({
  label,
  submitLabel,
  initialValue,
  onSubmit,
  loading = false,
  inline = false,
  disabled = false,
  success = false,
  failure = false,
  error,
}) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <form
      className="h-32 w-64 flex justify-center
      bg-form-bg  dark:bg-form-bgDark border
      border-form-border dark:border-form-borderDark rounded-xl"
      onSubmit={(ev) => {
        onSubmit(ev, value);
        inputRef.current?.blur();
      }}
    >
      <div className="flex flex-col w-[100%] my-2 items-center">
        <label className="text-2xl text-form-text dark:text-form-textDark capitalize">
          {label}
        </label>
        <div
          className={`flex h-[66%] w-full ${
            inline ? "flex-row" : "flex-col"
          } items-center justify-evenly gap-4`}
        >
          <input
            ref={inputRef}
            className={`
              ${inline ? "w-[60%]" : "w-[80%]"}
              text-center rounded-md px-1 
              bg-form-input text-form-inputText 
              dark:bg-form-inputDark dark:text-form-inputTextDark
              outline-none focus-visible:outline-1 focus-visible:outline-offset-0
              focus-visible:outline-form-border focus-visible:dark:outline-form-borderDark
              ${loading && "animate-pulse "} 
              ${disabled && "opacity-60"} 
              ${success && "ring-2 ring-success transition-color duration-500"} 
              ${failure && "ring-2 ring-error transition-color duration-500"}
            `}
            disabled={disabled}
            type="text"
            value={loading ? "" : value}
            onChange={(ev) => setValue(ev.target.value)}
          />
          {error ? <span className="text-sm text-error">{error}</span> : null}
          <input
            type="submit"
            disabled={disabled || loading}
            className={`
              rounded-xl bg-Btn px-3 py-1 font-semibold cursor-pointer
              hover:opacity-80 hover:shadow-lg
            bg-form-submit text-form-submitText
            dark:bg-form-submitDark dark:text-form-submitTextDark ${
              loading && "cursor-wait"
            } ${disabled && "cursor-not-allowed opacity-70"}
            `}
            value={submitLabel}
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
