import { initContract } from "@ts-rest/core";
import { prefixContract } from "./contracts/prefix";

export const contract = initContract().router({
    prefix: prefixContract
})