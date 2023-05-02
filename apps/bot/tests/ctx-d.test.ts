import { DBPrefix, DBReactionNotifications } from "database";
import { MonitoredCollection } from "utils";
import { assertType, describe, it } from "vitest";
import { ctx } from "../src/index";

describe('Context Should respect DB types', () => {
    it("Reaction Notifications", () => {
        assertType<MonitoredCollection<string, DBReactionNotifications>>(ctx.reactionNotifier)
    })
    it("Prefix", () => {
        assertType<MonitoredCollection<string, Omit<DBPrefix, "guildId">>>(ctx.prefix)
    })
});