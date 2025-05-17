import { expectType, expectError } from 'tsd';
import { EventMessage } from '../src/event-message';
import { EventStatus } from '../src/event-status';

const valid: EventMessage<string> = {
    id: 'evt-123',
    messageId: 'msg-abc',
    type: 'user.created',
    payload: 'Hello World',
    status: EventStatus.RECEIVED
};

expectType<EventMessage<string>>(valid);

const eventWithProps: EventMessage<{ userId: number }> = {
    id: 'evt-456',
    messageId: 'msg-def',
    type: 'user.updated',
    payload: { userId: 42 },
    status: EventStatus.DONE,
    properties: {
        contentType: 'application/json',
        correlationId: 'cor-001',
        headers: {
            tenant: 'acme'
        },
        timestamp: 1710000000
    }
};

expectType<EventMessage<{ userId: number }>>(eventWithProps);

expectError<EventMessage>({
    id: 'evt-001',
    type: 'user.created',
    payload: 'missing fields'
});

expectError<EventMessage>({
    id: 'evt-002',
    messageId: 'msg-001',
    type: 'invalid.status',
    payload: 'error',
    status: 'unknown'
});

expectError<EventMessage<number>>({
    id: 'evt-003',
    messageId: 'msg-003',
    type: 'event.type',
    payload: 'should be number',
    status: EventStatus.PROCESSING
});
