export interface Interval {
    onCallback: () => Promise<boolean>;
    onTimeout: () => Promise<any>;
    intervalMs: number;
    timeoutMs: number;
}

export class IntervalManager {
    protected intervals: { [intervalId: string]: Interval } = {};

    constructor() {
        this._intervalCallback = this._intervalCallback.bind(this);
        this._timeoutCallback = this._timeoutCallback.bind(this);
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

        setTimeout(this._forTesting().bind(this), intervalMs);
        setTimeout(this._timeoutCallback(intervalId).bind(this), timeoutMs);
    }

    public clearInterval(intervalId: string) {
        if (intervalId in this.intervals) {
            delete this.intervals[intervalId];
        }
    }

    protected _intervalCallback(intervalId: string): () => Promise<void> {
        return async () => {
            if (intervalId in this.intervals) {
                const { onCallback, intervalMs } = this.intervals[intervalId];

                const continueInterval = await onCallback();

                if (continueInterval) {
                    setTimeout(this._intervalCallback(intervalId), intervalMs);
                } else {
                    this.clearInterval(intervalId);
                }
            }
        };
    }

    protected _timeoutCallback(intervalId: string): () => Promise<void> {
        return async () => {
            if (intervalId in this.intervals) {
                const { onTimeout } = this.intervals[intervalId];

                await onTimeout();

                this.clearInterval(intervalId);
            }
        };
    }
}
