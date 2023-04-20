import { useState } from "react";

const DEFAULT_DURATION = 700;

/**
 * @description Provides triggerable `true` value for specified duration
 * 
 */
const useBlink = (duration: number = DEFAULT_DURATION) => {
    const [blink, setBlink] = useState<boolean>(false);
    const triggerBlink = () => {
        setBlink(true);
        const timer = setTimeout(() => setBlink(false), duration);
    }
    return [blink, triggerBlink] as const;
}

export default useBlink;