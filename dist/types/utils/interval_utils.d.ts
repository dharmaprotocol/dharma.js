export interface Interval {
    onCallback: () => Promise<boolean>;
    onTimeout: () => Promise<any>;
    intervalMs: number;
    timeoutMs: number;
}
export declare class IntervalManager {
    private intervals;
    constructor();
    setInterval(intervalId: string, onCallback: () => Promise<boolean>, onTimeout: () => Promise<any>, intervalMs: number, timeoutMs: number): void;
    clearInterval(intervalId: string): void;
    private _intervalCallback(intervalId);
    private _timeoutCallback(intervalId);
}
