export class NotServedError extends Error {
    constructor(ctx: string, guildId: string) {
        super(`${ctx}: Guild ${guildId} is not served`)
    }
}