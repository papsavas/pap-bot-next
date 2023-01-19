export type Actions = {
    prefix: (data: { prefix: string, guildId: string }) => void,
    poll: (data: { message: string }) => void,
    guilds: (data: { id: string, name: string, iconUrl: string | null }[]) => void
}