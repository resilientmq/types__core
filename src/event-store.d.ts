import type { EventMessage } from './event-message';
import type { EventStatus } from './event-status';

/**
 * Defines a contract for storing and retrieving events in a resilient message system.
 * Implementations may use in-memory, Redis, SQL, MongoDB, or other backends.
 */
export interface EventStore {
    /**
     * Persists a new event in the store.
     *
     * @param event - The event to be saved.
     */
    saveEvent(event: EventMessage): Promise<void>;

    /**
     * Updates the processing status of an existing event.
     *
     * @param messageId - The unique identifier of the event (AMQP or logical ID).
     * @param status - The new status to apply to the event.
     */
    updateEventStatus(messageId: string, status: EventStatus): Promise<void>;

    /**
     * Retrieves an event by its unique identifier.
     *
     * @param messageId - The unique ID of the event to retrieve.
     * @returns The matching event if found, or null if not.
     */
    getEvent(messageId: string): Promise<EventMessage | null>;

    /**
     * Deletes an event from the store.
     *
     * @param messageId - The unique ID of the event to delete.
     */
    deleteEvent(messageId: string): Promise<void>;
}
