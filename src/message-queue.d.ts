import type { Options } from 'amqplib';
import type { EventMessage } from './event-message';
import type { ExchangeConfig } from './rabbitmq-resilience-config';

/**
 * Represents a contract for an abstract message queue system (e.g., RabbitMQ).
 * Implementations should provide connection management, publishing, and consumption logic.
 */
export interface MessageQueue {
    /**
     * Establishes a connection to the message broker and sets the message prefetch count.
     *
     * @param prefetch - Maximum number of unacknowledged messages allowed. Defaults to 1.
     */
    connect(prefetch?: number): Promise<void>;

    /**
     * Publishes an event to a queue or an exchange.
     *
     * @param queue - The target queue to send the message to. Used if `exchange` is not provided.
     * @param event - The event message to be published.
     * @param options - Optional configuration for publishing, such as exchange routing or AMQP message properties.
     */
    publish(
        queue: string,
        event: EventMessage,
        options?: {
            /**
             * Exchange configuration. If provided, the message will be routed through this exchange.
             */
            exchange?: ExchangeConfig;

            /**
             * AMQP-level message properties such as headers, persistence, correlation ID, etc.
             */
            properties?: Options.Publish;
        }
    ): Promise<void>;

    /**
     * Subscribes to a queue and consumes incoming messages.
     *
     * @param queue - Name of the queue to consume from.
     * @param onMessage - Handler function to process each incoming event.
     */
    consume(
        queue: string,
        onMessage: (event: EventMessage) => Promise<void>
    ): Promise<void>;
}
