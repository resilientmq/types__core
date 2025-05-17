import { expectType, expectError } from 'tsd';
import { Middleware } from '../src/middleware';
import type { EventMessage } from '../src/event-message';

const logger: Middleware = async (event, next) => {
    console.log('Event received:', event.id);
    await next();
};

expectType<Middleware>(logger);

const validator: Middleware = async (event, next) => {
    if (!event.payload) throw new Error('Missing payload');
    await next();
};

expectType<Middleware>(validator);

expectError<Middleware>(async (event: number, next: string) => {});
