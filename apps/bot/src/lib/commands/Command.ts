import {
	ApplicationCommandData,
	CommandInteraction,
	InteractionDeferReplyOptions,
	InteractionReplyOptions,
	Message,
	MessageReplyOptions,
	RESTPostAPIApplicationGuildCommandsJSONBody,
	Snowflake,
	TextBasedChannel,
	User,
	bold,
	italic,
	spoiler,
} from 'discord.js';
import { values } from 'utils';
import { Context } from '../../../types/Context';
import { deleteCommand, getCommands, registerCommand } from './rest';
import { CommandLiteral, sliceCommand } from './slice';

type Warnings = {
	only: Record<
		'guild' | 'messageContext' | 'userContext' | 'slashCommand',
		string
	>;
	closedDms: string;
};

type ReplyOptions<T> = T extends CommandInteraction
	? InteractionReplyOptions
	: T extends Message
	? MessageReplyOptions
	: never;

type CommandSource = CommandInteraction | Message;

//TODO: provide resolved command args
type CommandContext = {
	source: CommandSource;
	ctx: Context;
	user: User;
	channel: TextBasedChannel | null;
	warnings: Warnings;
	//TODO: type according to CommandSource
	sliced: CommandLiteral | null;
	deferReply: (
		callback: () => unknown,
		InteractionOptions?: InteractionDeferReplyOptions
	) => Promise<unknown>;
	reply: (options: ReplyOptions<CommandSource>) => Promise<Message>;
	delete: () => Promise<Message | void>;
};

export default class Command {
	readonly name: string;
	readonly data: ApplicationCommandData;
	execute: (source: CommandSource, ctx: Context) => Promise<void>;
	constructor({
		data,
		execute,
	}: {
		data: ApplicationCommandData;
		execute: (cmdCtx: CommandContext) => Promise<unknown>;
	}) {
		this.name = data.name;
		this.data = data;
		this.execute = async (source, ctx) => {
			const user =
				source instanceof CommandInteraction ? source.user : source.author;
			const channel = source.channel;
			const warnings = {
				only: {
					guild: `This command is guild only`,
					messageContext: `This is a context menu command. *Right click => Apps => ${this.name}* on a message to use`,
					userContext: `This is a context menu command. *Right click => Apps => ${this.name}* on a user to use`,
					slashCommand: `This is a slash command. Type /${this.name} to use it`,
				},
				closedDms: `Your DMs for this guild are closed. ${bold(
					italic(
						`Server name dropdown => Privacy Settings => Direct Messages ✅`
					) + " After, you'll need to retry this command"
				)}
                ${spoiler(
									'Tip: Once a DM channel between us is established you can close them again everywhere'
								)}`,
			};
			await execute({
				source,
				ctx,
				channel,
				user,
				warnings,
				sliced:
					source instanceof Message
						? source.inGuild()
							? sliceCommand(source, ctx.prefix.get(source.guildId)!.prefix)
							: sliceCommand(source, values.defaultPrefix)
						: null,

				deferReply: (
					callback: () => unknown,
					interactionOptions?: InteractionDeferReplyOptions
				) =>
					(source instanceof CommandInteraction
						? source.deferReply(interactionOptions)
						: source.channel.sendTyping()
					).then(callback),

				reply: (options: ReplyOptions<typeof source>) =>
					source instanceof CommandInteraction
						? source.deferred
							? source.editReply(options)
							: source.replied
							? //@ts-expect-error infers union
							  source.followUp(options)
							: //@ts-expect-error infers union
							  source.reply(options)
						: //@ts-expect-error infers union
						  source.reply(options),

				delete: () =>
					source instanceof CommandInteraction
						? source.deleteReply()
						: source.delete(),
			});
		};
	}

	async register(guildId?: Snowflake) {
		const res = await registerCommand({
			guildId,
			body: this.data as RESTPostAPIApplicationGuildCommandsJSONBody,
		});
		console.log(
			`registered command ${res?.name} for ${res.guild_id ?? 'global manager'}`
		);
	}

	async delete(guildId?: Snowflake) {
		const commands = await getCommands({ guildId });
		const cmd = commands?.find((c) => c.name === this.name);
		if (!cmd)
			return console.error(
				`Command ${this.name} could not be fetched for deletion`
			);
		await deleteCommand({ commandId: cmd.id, guildId });
		console.log(
			`deleted command ${cmd.name} for ${guildId ?? 'global manager'}`
		);
	}
}
