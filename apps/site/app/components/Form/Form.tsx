import { FC, FormEvent, useEffect, useState } from "react";

const Form: FC<{
  label: string;
  submitLabel: string;
  initialValue: HTMLInputElement["value"];
  onSubmit: (
    event: FormEvent<Element>,
    value: HTMLInputElement["value"]
  ) => void;
  loading?: boolean;
  inline?: boolean;
  disabled?: boolean;
}> = ({
  label,
  submitLabel,
  initialValue,
  onSubmit,
  loading = false,
  inline = false,
  disabled = false,
}) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <form
      className={`flex ${inline ? "flex-row" : "flex-col"}  items-center gap-4`}
      onSubmit={(ev) => {
        onSubmit(ev, value);
      }}
    >
      <label>{label}</label>
      <input
        className={`
        flex-1 rounded-md bg-neutral-200 px-1 
        dark:bg-neutral-800 dark:text-neutral-300 
        ${loading && "animate-pulse"} ${disabled && "opacity-60"}
        `}
        disabled={disabled}
        type="text"
        value={loading ? "" : value}
        onChange={(ev) => setValue(ev.target.value)}
      />

      <button
        type="submit"
        disabled={disabled || loading}
        className={`rounded-xl bg-lightBtn px-3 py-1 font-semibold hover:opacity-80 dark:bg-darkBtn dark:text-neutral-900 ${
          loading && "cursor-wait"
        } ${disabled && "cursor-not-allowed opacity-70"}`}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default Form;
