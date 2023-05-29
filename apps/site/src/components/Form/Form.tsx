import { FC, useEffect, useRef, useState } from 'react';
import { FormSubmit } from '../../types';

const Form: FC<{
	label: string;
	submitLabel: string;
	initialValue: HTMLInputElement['value'];
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
			className="bg-form-bg dark:bg-form-bgDark
			border-form-border dark:border-form-borderDark
      flex h-32 w-64
      justify-center rounded-xl border"
			onSubmit={(ev) => {
				onSubmit(ev, value);
				inputRef.current?.blur();
			}}
		>
			<div className="my-2 flex w-[100%] flex-col items-center">
				<label className="text-form-text dark:text-form-textDark text-2xl capitalize">
					{label}
				</label>
				<div
					className={`flex h-[66%] w-full ${
						inline ? 'flex-row' : 'flex-col'
					} items-center justify-evenly gap-4`}
				>
					<input
						ref={inputRef}
						className={`
              ${inline ? 'w-[60%]' : 'w-[80%]'}
              bg-form-input text-form-inputText dark:bg-form-inputDark 
              dark:text-form-inputTextDark focus-visible:outline-form-border 
              focus-visible:dark:outline-form-borderDark rounded-md
              px-1 text-center outline-none
              focus-visible:outline-1 focus-visible:outline-offset-0
              ${loading && 'animate-pulse '} 
              ${disabled && 'opacity-60'} 
              ${success && 'ring-success transition-color ring-2 duration-500'} 
              ${failure && 'ring-error transition-color ring-2 duration-500'}
            `}
						disabled={disabled}
						type="text"
						value={loading ? '' : value}
						onChange={(ev) => setValue(ev.target.value)}
					/>
					{error ? <span className="text-error text-sm">{error}</span> : null}
					<input
						type="submit"
						disabled={disabled || loading}
						className={`
              bg-Btn bg-form-submit text-form-submitText dark:bg-form-submitDark dark:text-form-submitTextDark cursor-pointer
              rounded-xl px-3
            py-1 font-semibold
            hover:opacity-80 hover:shadow-lg ${loading && 'cursor-wait'} ${
							disabled && 'cursor-not-allowed opacity-70'
						}
            `}
						value={submitLabel}
					/>
				</div>
			</div>
		</form>
	);
};

export default Form;
