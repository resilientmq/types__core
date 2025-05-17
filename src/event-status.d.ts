/**
 * Represents the lifecycle status of an event within the resilience system.
 * Used by processors and event stores to track state transitions.
 */
export enum EventStatus {
    /**
     * The event was received and stored, but has not yet been processed.
     */
    RECEIVED = 'received',

    /**
     * The event is currently being processed.
     */
    PROCESSING = 'processing',

    /**
     * The event was successfully handled and completed.
     */
    DONE = 'done',

    /**
     * The event failed during processing and will not be retried further.
     */
    ERROR = 'error',

    /**
     * The event is being retried after a failure (typically through a retry queue).
     */
    RETRY = 'retry'
}
