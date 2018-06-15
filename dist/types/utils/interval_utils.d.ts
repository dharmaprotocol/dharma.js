export interface Interval {
    onCallback: () => Promise<boolean>;
    onTimeout: () => Promise<any>;
    intervalMs: number;
    timeoutMs: number;
}
export declare class IntervalManager {
    protected intervals: {
        [intervalId: string]: Interval;
    };
    constructor();
    setInterval(intervalId: string, onCallback: () => Promise<boolean>, onTimeout: () => Promise<any>, intervalMs: number, timeoutMs: number): void;
    clearInterval(intervalId: string): void;
    protected _intervalCallback(intervalId: string): () => Promise<void>;
    protected _timeoutCallback(intervalId: string): () => Promise<void>;
}
