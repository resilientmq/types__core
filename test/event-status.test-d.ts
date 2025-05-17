import { expectError } from 'tsd';
import { EventStatus } from '../src/event-status';

expectError<EventStatus>('done');
expectError<EventStatus>('processing');
expectError<EventStatus>('RETRY');
expectError<EventStatus>(999);
