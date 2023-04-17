import { FC, useEffect, useRef, useState } from "react";

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
      className={`flex ${
        inline ? "flex-row" : "flex-col"
      } items-baseline gap-4`}
      onSubmit={(ev) => {
        onSubmit(ev, value);
        inputRef.current?.blur();
      }}
    >
      <label>{label}</label>
      <div className="flex flex-col items-start gap-[6px]">
        <input
          ref={inputRef}
          className={`
        flex-1 rounded-md bg-neutral-200 px-1 
        dark:bg-neutral-800 dark:text-neutral-300 
        ${loading && "animate-pulse"} 
        ${disabled && "opacity-60"} 
        ${success && "ring-2 ring-green-500"} 
        ${failure && "ring-2 ring-error"}
        transition-all duration-500
        `}
          disabled={disabled}
          type="text"
          value={loading ? "" : value}
          onChange={(ev) => setValue(ev.target.value)}
        />
        {error ? <span className="text-sm text-error">{error}</span> : null}
      </div>
      <input
        type="submit"
        disabled={disabled || loading}
        className={`rounded-xl bg-lightBtn px-3 py-1 font-semibold hover:opacity-80 hover:shadow-lg dark:bg-darkBtn dark:text-neutral-900 ${
          loading && "cursor-wait"
        } ${disabled && "cursor-not-allowed opacity-70"}`}
        value={submitLabel}
      />
    </form>
  );
};

export default Form;
