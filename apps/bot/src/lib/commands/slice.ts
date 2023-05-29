import { Message } from 'discord.js';

const argDigits = <const>[1, 2, 3, 4];
type ArgDigits = (typeof argDigits)[number];
type Argx = `arg${ArgDigits}`;
type Argsx = `args${ArgDigits}`;
type ArgxType = Record<Argx, string>;
type ArgsxType = Record<Argsx, string>;
type ToArgxType<T> = {
	[K in keyof T as Argx]: string;
};
type ToArgsxType<T> = {
	[K in keyof T as Argsx]: string;
};

export type CommandLiteral = {
	fullCommand: string;
	primaryCommand: string;
} & ArgxType &
	ArgsxType;

export const sliceCommand = (
	message: Message,
	prefix: string
): CommandLiteral => {
	const content = message.content;
	const fullCommand: string = content.substring(prefix.length); // Remove the prefix;
	const splitCommand: string[] = fullCommand
		.split(/(\s+)/)
		.filter((e) => e.trim().length > 0); //split command from space(s);
	const arg = Object.fromEntries(
		argDigits.map((k) => [`arg${k}`, splitCommand[k]])
	);
	const args = Object.fromEntries(
		argDigits.map((k) => [`args${k}`, splitCommand.slice(k).join(' ')])
	);

	return {
		fullCommand,
		primaryCommand: splitCommand[0],
		...(arg as ToArgxType<typeof arg>),
		...(args as ToArgsxType<typeof args>),
	};
};
