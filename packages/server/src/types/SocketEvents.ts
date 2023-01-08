
export type ServerToClientEvents = {
    prefix: (prefix: string, guildId: string) => void

}

export type ClientToServerEvents = {
    prefix: (prefix: string, guildId: string) => void
}

