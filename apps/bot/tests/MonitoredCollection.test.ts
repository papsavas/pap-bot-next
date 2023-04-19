import { describe, it, vi } from "vitest";
import { MonitoredCollection } from './../src/utils/MonitoredCollection';


describe('Monitored Collection', () => {
    const [k, v] = ["key", "val"];
    const mockMonitor = vi.fn();
    const mc = new MonitoredCollection<string, string>(undefined, {
        get: mockMonitor,
        set: mockMonitor,
        delete: mockMonitor
    });

    it('should trigger monitor', () => {
        mockMonitor.mockClear();
        mc.set(k, v, true);
        mc.get(k, true);
        mc.delete(k, true);
        expect(mockMonitor).toBeCalledTimes(3)
    });

    it('should not trigger monitor', () => {
        mockMonitor.mockClear();
        mc.set(k, v);
        mc.get(k, false);
        mc.delete(k);
        expect(mockMonitor).not.toBeCalled()
    });
});