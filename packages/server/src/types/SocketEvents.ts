
type Events = {
    prefix: (data: { prefix: string, guildId: string }) => void,
    poll: (data: { message: string }) => void
}

export type ServerToClientEvents = Events

export type ClientToServerEvents = Events

