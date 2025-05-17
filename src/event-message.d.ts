import { EventStatus } from './event-status';

/**
 * Optional AMQP message properties. These provide metadata used for
 * tracing, compatibility, retry logic, and RPC behaviors.
 */
export type EventProperties = {
    /** MIME content type (e.g., 'application/json') */
    contentType?: string;

    /** Message content encoding (e.g., 'gzip') */
    contentEncoding?: string;

    /** Custom headers associated with the message */
    headers?: Record<string, any>;

    /** Delivery mode (1 = non-persistent, 2 = persistent) */
    deliveryMode?: number;

    /** Message priority (0–9) */
    priority?: number;

    /** Correlation ID for request/response patterns */
    correlationId?: string;

    /** Queue name to send reply to (used in RPC) */
    replyTo?: string;

    /** Message expiration time (in milliseconds, as a string) */
    expiration?: string;

    /** Message ID, typically set by the publisher */
    messageId?: string;

    /** Timestamp of when the message was created (UNIX epoch in seconds) */
    timestamp?: number;

    /** Logical message type (may be different from EventMessage.type) */
    type?: string;

    /** ID of the user that sent the message */
    userId?: string;

    /** ID of the application that sent the message */
    appId?: string;
};

/**
 * Represents a resilient event flowing through the messaging system.
 *
 * @typeParam T - The payload type of the event.
 */
export type EventMessage<T = any> = {
    /**
     * Globally unique identifier for the event, used as a primary key in event stores.
     */
    id: string;

    /**
     * AMQP-level message ID, useful for tracing, deduplication, or external correlation.
     */
    messageId: string;

    /**
     * Logical type of the event (e.g., 'user.created', 'order.placed').
     */
    type: string;

    /**
     * Payload data carried by the event.
     */
    payload: T;

    /**
     * Current lifecycle status of the event.
     */
    status: EventStatus;

    /**
     * Optional metadata associated with the original AMQP message.
     */
    properties?: EventProperties;
};
