import { initClient } from "@ts-rest/core";
import { BOT_ENDPOINT, contract } from "http-contract";

export const tsRest = initClient(contract, {
    baseUrl: BOT_ENDPOINT,
    baseHeaders: {}
})