import { initClient } from "@ts-rest/core";
import { contract } from "http-contract";

export const tsRest = initClient(contract, {
    //TODO: imported `BOT_ENDPOINT` undefined on load
    baseUrl: "http://localhost:4040",
    baseHeaders: {

    }
})