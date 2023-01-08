
type Events = {
    prefix: (prefix: string, guildId: string) => void
}

export type ServerToClientEvents = Events

export type ClientToServerEvents = Events

