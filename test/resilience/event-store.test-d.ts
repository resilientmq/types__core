import {EventStore} from "../../src/resilience/event-store";
import {EventMessage} from "../../src/resilience/event-message";

const mockStore: EventStore = {
  saveEvent: async (event: EventMessage) => {},
  updateEventStatus: async (id: string, status: string) => {},
  getEvent: async (id: string) => null,
  deleteEvent: async (id: string) => {}
};