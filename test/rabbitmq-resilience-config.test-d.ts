import { expectType, expectError } from 'tsd';
import type {
    RabbitMQResilienceConfig,
    ExchangeConfig,
    EventProcessConfig
} from '../src/rabbitmq-resilience-config';
import type { EventMessage } from '../src/event-message';
import type { EventStore } from '../src/event-store';

const store: EventStore = {
    saveEvent: async () => {},
    updateEventStatus: async () => {},
    getEvent: async () => null,
    deleteEvent: async () => {}
};

const exchange: ExchangeConfig = {
    name: 'main-exchange',
    type: 'direct'
};

const handler: EventProcessConfig = {
    type: 'user.created',
    handler: async (payload) => {}
};

const validConfig: RabbitMQResilienceConfig = {
    connection: 'amqp://localhost',
    queue: 'my.queue',
    exchange,
    eventsToProcess: [handler],
    store
};

expectType<RabbitMQResilienceConfig>(validConfig);

const fullConfig: RabbitMQResilienceConfig = {
    connection: {
        hostname: 'localhost',
        username: 'guest',
        password: 'guest'
    },
    queue: 'jobs.queue',
    exchange,
    retryQueue: {
        queue: 'jobs.retry',
        ttlMs: 10000,
        exchange: {
            name: 'retry-ex',
            type: 'fanout'
        }
    },
    deadLetterQueue: {
        queue: 'jobs.dlq',
        exchange: {
            name: 'dlq-ex',
            type: 'fanout'
        }
    },
    prefetch: 5,
    maxUptimeMs: 30000,
    reconnectDelayMs: 1000,
    heartbeatIntervalMs: 10000,
    idleCheckIntervalMs: 5000,
    maxIdleChecks: 3,
    exitIfIdle: true,
    eventsToProcess: [handler],
    store,
    events: {
        onEventStart: (e: EventMessage) => {},
        onSuccess: (e: EventMessage) => {},
        onError: (e: EventMessage, err: Error) => {}
    },
    middleware: [
        async (event, next) => {
            console.log('Before');
            await next();
            console.log('After');
        }
    ]
};

expectType<RabbitMQResilienceConfig>(fullConfig);

expectError<RabbitMQResilienceConfig>({
    connection: 'amqp://localhost',
    queue: 'no-handler',
    exchange
});
