import { expectType, expectError } from 'tsd';
import type { MessageQueue } from '../src/message-queue';
import type { EventMessage } from '../src/event-message';
import type { ExchangeConfig } from '../src/rabbitmq-resilience-config';

const queue: MessageQueue = {
    connect: async (prefetch?: number) => {},
    publish: async (queue, event, options) => {},
    consume: async (queue, onMessage) => {}
};

expectType<MessageQueue>(queue);

expectError<MessageQueue>({
    connect: async () => {},
    publish: async () => {}
});

expectError<MessageQueue>({
    connect: async () => {},
    publish: async (queue: number, event: string) => {},
    consume: async () => {}
});
