import { IntervalManager } from "utils/interval_utils";

/**
 * Mimics IntervalManager, but allows for overriding timeout functionality so that
 * it can be used in testing environments without real timeout functions.
 */
export class MockIntervalManager extends IntervalManager {
    private _shouldTimeout;

    constructor(shouldTimeout: boolean) {
        super();

        this._shouldTimeout = shouldTimeout;
    }

    public setInterval(
        intervalId: string,
        onCallback: () => Promise<boolean>,
        onTimeout: () => Promise<any>,
        intervalMs: number,
        timeoutMs: number,
    ) {
        this.intervals[intervalId] = {
            onCallback,
            onTimeout,
            intervalMs,
            timeoutMs,
        };

        setTimeout(this._intervalCallback(intervalId), intervalMs);

        if (this._shouldTimeout) {
            setTimeout(this._timeoutCallback(intervalId), timeoutMs);
        }
    }
}
