import { expectType, expectError } from 'tsd';
import type { EventStore } from '../src/event-store';
import type { EventMessage } from '../src/event-message';
import { EventStatus } from '../src/event-status';

const mockStore: EventStore = {
    saveEvent: async (event) => {},
    updateEventStatus: async (messageId, status) => {},
    getEvent: async (messageId) => null,
    deleteEvent: async (messageId) => {}
};

expectType<EventStore>(mockStore);

expectError<EventStore>({
    saveEvent: async () => {},
    updateEventStatus: async () => {},
    getEvent: async () => null
});

expectError<EventStore>({
    saveEvent: async (event: number) => {},
    updateEventStatus: async (id: string, status: string) => {},
    getEvent: async (id: string) => null,
    deleteEvent: async (id: string) => {}
});
