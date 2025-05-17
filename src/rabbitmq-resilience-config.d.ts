import { Middleware } from './middleware';
import { EventStore } from './event-store';
import { MessageQueue } from './message-queue';
import type { Options } from 'amqplib';
import type { EventMessage } from './event-message';

/**
 * Configuration for a RabbitMQ exchange.
 */
export type ExchangeConfig = {
    /**
     * The name of the exchange.
     */
    name: string;

    /**
     * The type of the exchange (e.g., direct, topic, fanout, headers).
     */
    type: 'direct' | 'topic' | 'fanout' | 'headers';

    /**
     * Optional routing key used when binding queues or publishing.
     */
    routingKey?: string;

    /**
     * Whether the exchange should be durable (survives broker restart).
     */
    durable?: boolean;
};

/**
 * Configuration object for initializing a resilient RabbitMQ event consumer.
 * This controls broker connection, queues, retries, DLQs, middleware, and event handlers.
 */
export type RabbitMQResilienceConfig = {
    /**
     * AMQP connection string or detailed connection options.
     */
    connection: string | Options.Connect;

    /**
     * Max uptime (in ms) before the consumer self-restarts. Optional.
     */
    maxUptimeMs?: number;

    /**
     * Delay (in ms) before reconnecting after a shutdown or disconnect.
     */
    reconnectDelayMs?: number;

    /**
     * Interval (in ms) to check the health of the broker connection.
     */
    heartbeatIntervalMs?: number;

    /**
     * Whether to exit the process if all queues remain empty.
     */
    exitIfIdle?: boolean;

    /**
     * How often (in ms) to check for idle queues.
     */
    idleCheckIntervalMs?: number;

    /**
     * Maximum number of consecutive idle checks before the process exits.
     */
    maxIdleChecks?: number;

    /**
     * The name of the main queue to consume from.
     */
    queue: string;

    /**
     * The main exchange configuration used for publishing and binding.
     */
    exchange: ExchangeConfig;

    /**
     * Configuration for the retry queue (used when processing fails).
     */
    retryQueue?: {
        /**
         * Name of the retry queue.
         */
        queue: string;

        /**
         * Optional exchange used for retry routing.
         */
        exchange?: ExchangeConfig;

        /**
         * TTL (time to live) in ms before the message is re-routed back.
         */
        ttlMs?: number;
    };

    /**
     * Configuration for the dead-letter queue (used when retries are exhausted).
     */
    deadLetterQueue?: {
        /**
         * Name of the DLQ.
         */
        queue: string;

        /**
         * Optional exchange used for routing DLQ messages.
         */
        exchange?: ExchangeConfig;
    };

    /**
     * Prefetch value for RabbitMQ. Controls how many unacknowledged messages can be handled at once.
     */
    prefetch?: number;

    /**
     * List of event types and handlers this consumer should process.
     */
    eventsToProcess: EventProcessConfig[];

    /**
     * Optional lifecycle hooks for observability (start, success, error).
     */
    events?: ResilientEventHooks;

    /**
     * Optional array of middleware functions to wrap event handlers.
     */
    middleware?: Middleware[];

    /**
     * Event store interface for persisting and tracking event state.
     */
    store: EventStore;
};

/**
 * Internal configuration used by the event processor that includes the broker instance.
 */
export type RabbitMQResilientProcessorConfig = RabbitMQResilienceConfig & {
    /**
     * The connected broker instance used for publishing and consuming messages.
     */
    broker: MessageQueue;
};

/**
 * Defines a mapping between an event type and the handler that processes it.
 */
export type EventProcessConfig<T = any> = {
    /**
     * The event type string (e.g., 'user.created').
     */
    type: string;

    /**
     * The function that handles the event payload.
     */
    handler: (payload: T) => Promise<void>;
};

/**
 * Optional hooks invoked during different phases of event processing.
 */
export type ResilientEventHooks = {
    /**
     * Called right before processing an event.
     */
    onEventStart?: (event: EventMessage) => void;

    /**
     * Called after successful event processing.
     */
    onSuccess?: (event: EventMessage) => void;

    /**
     * Called after a failed attempt to process an event.
     */
    onError?: (event: EventMessage, error: Error) => void;
};
