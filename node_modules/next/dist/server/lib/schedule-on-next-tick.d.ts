type ScheduledFn<T = void> = () => T | PromiseLike<T>;
/**
 * Schedules a function to be called on the next tick after the other promises
 * have been resolved.
 */
export declare function scheduleOnNextTick<T = void>(cb: ScheduledFn<T>): void;
export {};
