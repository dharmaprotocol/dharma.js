export interface Interval {
    onCallback: () => Promise<boolean>;
    onTimeout: () => Promise<any>;
    intervalMs: number;
    timeoutMs: number;
}

export class IntervalManager {
    private intervals: { [intervalId: string]: Interval } = {};

    constructor() {
        this._intervalCallback = this._intervalCallback.bind(this);
        this._timeoutCallback = this._timeoutCallback.bind(this);
    }

    public setInterval(
        intervalId: string,
        onCallback: () => Promise<boolean>,
        onTimeout: () => Promise<any>,
        intervalMs: number,
        timeoutMs: number
    ) {
        this.intervals[intervalId] = {
            onCallback,
            onTimeout,
            intervalMs,
            timeoutMs,
        }

        setTimeout(this._intervalCallback(intervalId), intervalMs);
        setTimeout(this._timeoutCallback(intervalId), timeoutMs);
    }

    public clearInterval(intervalId: string) {
        if (intervalId in this.intervals) {
            delete this.intervals[intervalId];
        }
    }

    private async _intervalCallback(intervalId: string): Promise<any> {
        if (intervalId in this.intervals) {
            const { onCallback, intervalMs } = this.intervals[intervalId];

            const continueInterval = await onCallback();

            if (continueInterval) {
                setTimeout(this._intervalCallback(intervalId), intervalMs);
            } else {
                this.clearInterval(intervalId);
            }
        }
    }

    private async _timeoutCallback(intervalId: string): Promise<any> {
        if (intervalId in this.intervals) {
            const { onTimeout } = this.intervals[intervalId];

            await onTimeout();

            this.clearInterval(intervalId)
        }
    }
}
