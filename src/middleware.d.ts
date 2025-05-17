import type { EventMessage } from './event-message';

/**
 * A middleware function used to wrap or extend the behavior of an event handler.
 * It receives the current event and a `next` function to continue the processing chain.
 *
 * Middleware can be used for logging, validation, authentication, metrics,
 * retries, or any cross-cutting concern that should wrap around the event handler.
 *
 * @param event - The event being processed.
 * @param next - A function that proceeds to the next middleware or the final handler.
 * @returns A promise that resolves when the middleware and downstream logic complete.
 */
export type Middleware = (
    event: EventMessage,
    next: () => Promise<void>
) => Promise<void>;
