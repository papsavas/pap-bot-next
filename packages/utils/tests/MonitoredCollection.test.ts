import { describe, expect, it, vi } from "vitest";
import { MonitoredCollection } from "../MonitoredCollection";

describe('Monitored Collection', () => {
    const [k, v] = ["key", "val"];
    const mockMonitor = vi.fn();
    const mc = new MonitoredCollection<string, string>(undefined, {
        get: mockMonitor,
        set: mockMonitor,
        delete: mockMonitor,
        sweep: mockMonitor
    });

    it('should trigger monitor', () => {
        mockMonitor.mockClear();
        mc.set(k, v, true);
        mc.get(k, true);
        mc.delete(k, true);
        mc.sweep(() => true, true);
        expect(mockMonitor).toBeCalledTimes(4)
    });

    it('should not trigger monitor', () => {
        mockMonitor.mockClear();
        mc.set(k, v);
        mc.get(k, false);
        mc.delete(k);
        mc.sweep(() => true);
        expect(mockMonitor).not.toBeCalled()
    });
});