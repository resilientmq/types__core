import type { Options } from 'amqplib';
import type { EventMessage } from './event-message';
import { Middleware } from './middleware';
import { EventStore } from './event-store';
import { MessageQueue } from '../broker/message-queue';

/**
 * Describes a RabbitMQ exchange to be used for binding or publishing.
 */
export type ExchangeConfig = {
    /**
     * Name of the exchange (must be unique in vhost).
     */
    name: string;

    /**
     * Type of exchange ('direct', 'topic', 'fanout', or 'headers').
     */
    type: 'direct' | 'topic' | 'fanout' | 'headers';

    /**
     * Optional routing key used when binding queues or publishing.
     */
    routingKey?: string;

    /**
     * Exchange creation options such as durability or arguments.
     */
    options: Options.AssertExchange;
};

/**
 * Common configuration for a queue, with optional binding to an exchange.
 */
export interface QueueBinding {
    /**
     * Name of the queue to assert or bind.
     */
    queue: string;

    /**
     * AMQP queue options like durability, arguments, etc.
     */
    options: Options.AssertQueue;

    /**
     * Optional exchange associated with this queue.
     */
    exchange?: ExchangeConfig;
}

/**
 * Configuration for the retry queue, including TTL and attempt limit.
 */
export interface RetryQueueConfig extends QueueBinding {
    /**
     * Time to wait before retrying (milliseconds).
     */
    ttlMs?: number;

    /**
     * Maximum number of retry attempts before dead-lettering.
     */
    maxAttempts?: number;
}

/**
 * Configuration for initializing a resilient RabbitMQ consumer.
 */
export type ResilientConsumerConfig = {
    /**
     * AMQP connection URI or connection parameters.
     */
    connection: string | Options.Connect;

    /**
     * Max allowed uptime before automatic reconnect (in ms).
     */
    maxUptimeMs?: number;

    /**
     * Delay before attempting reconnect (in ms).
     */
    reconnectDelayMs?: number;

    /**
     * Interval to check connection/channel health (in ms).
     */
    heartbeatIntervalMs?: number;

    /**
     * Exit process if queues remain idle.
     */
    exitIfIdle?: boolean;

    /**
     * How often to check for idle state (in ms).
     */
    idleCheckIntervalMs?: number;

    /**
     * Max idle check failures before exiting.
     */
    maxIdleChecks?: number;

    /**
     * Queue and exchange to consume from.
     */
    consumeQueue: QueueBinding;

    /**
     * Retry queue configuration.
     */
    retryQueue?: RetryQueueConfig;

    /**
     * Dead-letter queue configuration.
     */
    deadLetterQueue?: QueueBinding;

    /**
     * Number of messages to prefetch for the consumer.
     */
    prefetch?: number;

    /**
     * List of event types and handlers to be processed.
     */
    eventsToProcess: EventProcessConfig[];

    /**
     * Lifecycle hooks for event processing.
     */
    events?: ResilientEventHooks;

    /**
     * Middleware applied to each event.
     */
    middleware?: Middleware[];

    /**
     * Event store implementation for persistence.
     */
    store: EventStore;
};

/**
 * Merged configuration used internally by the consumer processor.
 */
export type RabbitMQResilientProcessorConfig = ResilientConsumerConfig & {
    /**
     * A connected message broker implementation.
     */
    broker: MessageQueue;
};

/**
 * Defines how to handle a specific type of event message.
 */
export type EventProcessConfig<T = any> = {
    /**
     * Unique type identifier (e.g., 'order.created').
     */
    type: string;

    /**
     * Handler function that processes the event payload.
     */
    handler: (payload: T) => Promise<void>;
};

/**
 * Hook callbacks triggered at various stages of event lifecycle.
 */
export type ResilientEventHooks = {
    /**
     * Invoked before processing starts.
     */
    onEventStart?: (event: EventMessage) => void;

    /**
     * Invoked after successful processing.
     */
    onSuccess?: (event: EventMessage) => void;

    /**
     * Invoked after a processing error.
     */
    onError?: (event: EventMessage, error: Error) => void;
};

/**
 * Configuration for resilient event publishing.
 */
export type ResilientPublisherConfig = {
    /**
     * Broker connection string or object.
     */
    connection: string | Options.Connect;

    /**
     * Queue to publish directly to (if no exchange is used).
     */
    queue?: string;

    /**
     * Persistent event store.
     */
    store: EventStore;

    /**
     * Exchange configuration for publishing.
     */
    exchange?: ExchangeConfig;
};
