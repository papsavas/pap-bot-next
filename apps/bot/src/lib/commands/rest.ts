import {
	APIApplicationCommand,
	REST,
	RESTPostAPIApplicationGuildCommandsJSONBody,
	RESTPostAPIApplicationGuildCommandsResult,
	RESTPutAPIApplicationGuildCommandsJSONBody,
	RESTPutAPIApplicationGuildCommandsResult,
	Routes,
} from 'discord.js';
import dotenv from 'dotenv';
import findConfig from 'find-config';

dotenv.config({ path: findConfig('.env')! });

type Options = {
	guildId?: string;
	applicationId?: string;
};

//TODO: Change on prod
const DEFAULT_APP_ID = process.env.DISCORD_DEV_BOT_ID!;

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN!);

const resolveRoute = ({ guildId, applicationId = DEFAULT_APP_ID }: Options) =>
	guildId
		? Routes.applicationGuildCommands(applicationId, guildId)
		: Routes.applicationCommands(applicationId);

export const getCommands = (options: Options) =>
	rest.get(resolveRoute(options)) as Promise<APIApplicationCommand[]>;

export const setCommands = ({
	guildId,
	body,
	applicationId,
}: Options & { body: RESTPutAPIApplicationGuildCommandsJSONBody | [] }) =>
	rest.put(resolveRoute({ guildId, applicationId }), {
		body,
	}) as Promise<RESTPutAPIApplicationGuildCommandsResult>;

export const registerCommand = ({
	applicationId,
	guildId,
	body,
}: Options & { body: RESTPostAPIApplicationGuildCommandsJSONBody }) =>
	rest.post(resolveRoute({ guildId, applicationId }), {
		body,
	}) as Promise<RESTPostAPIApplicationGuildCommandsResult>;

export const deleteCommand = ({
	guildId,
	applicationId,
	commandId,
}: Options & { commandId: string }) =>
	rest.delete(`${resolveRoute({ guildId, applicationId })}/${commandId}`);
